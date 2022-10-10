﻿using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using static System.Linq.Queryable;
using System.Text;

namespace MarvelCU.Dal.Extensions;

public static class QueryableExtension
{
    public async static Task<ProcessedResult<T>> Query<T>(this IQueryable<T> query, ProcessedRequest processedRequest) where T : class
    {
        query = query.ApplyFilters(processedRequest.Filters);

        int total = await query.CountAsync();

        query = query.Paging(processedRequest.Paging).Sort(processedRequest.Sorting);

        ProcessedResult<T> result = new()
        {
            PageIndex = processedRequest.Paging.PageIndex,
            PageSize = processedRequest.Paging.PageSize,
            Total = total,
            Items = await query.ToListAsync()
        };

        return result;
    }

    public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, IList<Filter> filters)
    {
        if (!filters.Any()) return query;

        Expression<Func<T, bool>> lambdas = BuildExpression<T>(filters);

        query = System.Linq.Queryable.Where(query, lambdas);

        return query;
    }

    public static IQueryable<T> Paging<T>(this IQueryable<T> query, PagingRequest pagingRequest)
    {
        if (pagingRequest.PageSize is null || pagingRequest.PageIndex is null) return query;

        query = query.Skip((int)pagingRequest.PageIndex * (int)pagingRequest.PageSize).Take((int)pagingRequest.PageSize);

        return query;
    }

    public static IQueryable<T> Sort<T>(this IQueryable<T> query, SortingRequest sorting)
    {
        if (sorting.Prop is null) return query;

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

        for (int i = 0; i < filters.Count; i++)
        {
            if (i == 0)
            {
                exp = GetExpression<T>(param, filters[i]);
                continue;
            }

            exp = Expression.AndAlso(exp, GetExpression<T>(param, filters[i]));
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
            default:
                return null;
        }
    }
}

