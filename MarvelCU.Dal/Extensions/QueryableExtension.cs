using MarvelCU.Common.Models.Processing;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static System.Linq.Queryable;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using System.Reflection;

namespace MarvelCU.Dal.Extensions;

public static class QueryableExtension
{
    public async static Task<ProcessedResult<TDto>> Query<T, TDto>(this IQueryable<T> query, ProcessedRequest processedRequest, IMapper mapper) where T : class where TDto : class
    {
        query = query.ApplyFilters(processedRequest.Filters);

        int total = await query.CountAsync();

        query = query.Paging(processedRequest.Paging).Sort(processedRequest.Sorting);

        ProcessedResult<TDto> result = new()
        {
            PageIndex = processedRequest.Paging.PageIndex,
            PageSize = processedRequest.Paging.PageSize,
            Total = total,
            Items = await query.ProjectTo<TDto>(mapper.ConfigurationProvider).ToListAsync(),
            Next = AddNextPageRequest(processedRequest, total),
        };

        return result;
    }

    public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, IList<Filter> filters)
    {
        if (!filters.Any())
        {
            return query;
        }

        Expression<Func<T, bool>> lambdas = BuildExpression<T>(filters);

        query = System.Linq.Queryable.Where(query, lambdas);

        return query;
    }

    public static IQueryable<T> Paging<T>(this IQueryable<T> query, PagingRequest pagingRequest)
    {
        if (pagingRequest.PageSize is null || pagingRequest.PageIndex is null)
        {
            return query;
        }

        query = query.Skip((int)pagingRequest.PageIndex * (int)pagingRequest.PageSize).Take((int)pagingRequest.PageSize);

        return query;
    }

    public static IQueryable<T> Sort<T>(this IQueryable<T> query, SortingRequest sorting)
    {
        if (sorting.Prop is null)
        {
            return query;
        }

        ParameterExpression param = Expression.Parameter(typeof(T));
        MemberExpression member = Expression.Property(param, sorting.Prop);

        Expression<Func<T, object>> lambda = Expression.Lambda<Func<T, object>>(member, param);

        query = query.OrderBy(lambda);

        return query;
    }

    private static Expression<Func<T, bool>> BuildExpression<T>(IList<Filter> filters)
    {
        ParameterExpression param = Expression.Parameter(typeof(T));
        Expression exp = default;

        // Order filters by prop
        filters = filters.OrderBy(f => f.Prop).ToList();

        Filter current;

        for (int i = 0; i < filters.Count; i++)
        {
            if (i == 0)
            {
                exp = GetExpression<T>(param, filters[i]);
                current = filters[i];
                continue;
            }

            // If is multiple filters per prop apply or operator
            if (filters[i].Prop == filters[i - 1].Prop)
            {
                exp = Expression.Or(exp, GetExpression<T>(param, filters[i]));
            }
            // If is different filter prop apply and operator
            else
            {
                exp = Expression.AndAlso(exp, GetExpression<T>(param, filters[i]));
            }

        }

        return Expression.Lambda<Func<T, bool>>(exp, param);
    }

    private static Expression GetExpression<T>(ParameterExpression param, Filter filter)
    {
        MemberExpression member = Expression.Property(param, filter.Prop);
        ConstantExpression constant = Expression.Constant(Convert.ChangeType(filter.Value, member.Type));

        switch (filter?.Operation)
        {
            case Op.Eq:
                return Expression.Equal(member, constant);
            case Op.Gt:
                return Expression.GreaterThan(member, constant);
            case Op.GtEq:
                return Expression.GreaterThanOrEqual(member, constant);
            case Op.Lt:
                return Expression.LessThan(member, constant);
            case Op.LtEq:
                return Expression.LessThanOrEqual(member, constant);
            case Op.Ct:
                MethodInfo method = typeof(string).GetMethod("Contains", new[] { typeof(string) });
                return Expression.Call(member, method, constant);
            default:
                return null;
        }
    }

    private static ProcessedRequest AddNextPageRequest(ProcessedRequest processedRequest, int total)
    {
        // Verify if paging was applied
        if (IsPagingApplied(processedRequest.Paging))
        {
            return null;
        }

        // Verify if there is enough left items
        int? left = total - (processedRequest.Paging.PageIndex + 1) * processedRequest.Paging.PageSize;

        if (left <= 0)
        {
            return null;
        }

        return new ProcessedRequest()
        {
            Paging = new PagingRequest() { PageIndex = processedRequest.Paging.PageIndex + 1, PageSize = processedRequest.Paging.PageSize },
            Sorting = processedRequest.Sorting,
            Filters = processedRequest.Filters,
        };
    }

    private static bool IsPagingApplied(PagingRequest pagingRequest)
    {
        if (pagingRequest.PageIndex is null || pagingRequest.PageSize is null)
        {
            return false;
        }
        return true;
    }
}

