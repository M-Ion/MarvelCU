using AutoMapper;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;
using System.Linq.Expressions;

namespace MarvelCU.Dal.Interfaces;

public interface IRepository<T> where T : BaseEntity
{
    Task<T> GetAsync(int id);

    Task<List<T>> GetAllAsync();

    Task<ProcessedResult<TDto>> GetAllAsyncProcessed<TDto>(ProcessedRequest processedRequest, IMapper mapper) where TDto : class;

    Task<T> AddAsync(T entity);

    Task RemoveAsync(T entity);

    Task UpdateAsync(T entity);

    Task<T> Exists(int id);

    Task<T> GetEntityDetails(int id, params Expression<Func<T, object>>[] properties);

    Task<T> UpdateCollection<TColl>(T entity, IList<int> ids, string prop, bool add = true) where TColl : BaseEntity;

    Task Supply<E>(ICollection<E> collection, E entityToAdd) where E : BaseEntity;
}

