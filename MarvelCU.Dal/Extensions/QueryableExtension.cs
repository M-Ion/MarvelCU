using MarvelCU.Common.Models;

namespace MarvelCU.Dal.Extensions;

public static class QueryableExtension
{
    public static IQueryable<T> Paginate<T>(this IQueryable<T> query, PagedRequest pagedRequest)
    {
        return query.Skip(pagedRequest.PageIndex * pagedRequest.PageSize).Take(pagedRequest.PageSize);
    }
}

