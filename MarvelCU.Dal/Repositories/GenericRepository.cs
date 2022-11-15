using AutoMapper;
using MarvelCU.Common.Exceptions;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Dal.Extensions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Reflection;

namespace MarvelCU.Dal.Repositories;

public class GenericRepository<T> : IRepository<T> where T : BaseEntity
{
    private readonly MarvelDbContext _context;

    public GenericRepository(MarvelDbContext context)
    {
        _context = context;
    }

    public async Task<T> AddAsync(T entity)
    {
        await _context.AddAsync(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<T> Exists(int id)
    {
        var entity = await GetAsync(id);
        return entity ?? throw new IdNotFoundException($"{typeof(T).Name} not found with that id!");
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<ProcessedResult<TDto>> GetAllAsyncProcessed<TDto>(ProcessedRequest processedRequest, IMapper mapper) where TDto : class
    {
        return await _context.Set<T>().Query<T, TDto>(processedRequest, mapper);
    }

    public async Task<T> GetAsync(int id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> GetEntityDetails(int id, params Expression<Func<T, object>>[] properties)
    {
        IQueryable<T> query = IncludeProperties(properties);

        return await query.FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task RemoveAsync(T entity)
    {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task Supply<E>(ICollection<E> collection, E entityToAdd) where E : BaseEntity
    {
        collection.Add(entityToAdd);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task<T> UpdateCollection<TColl>(T entity, IList<int> ids, string prop, bool add = false) where TColl : BaseEntity
    {
        IList<TColl> entities = await _context.Set<TColl>().Where(e => ids.Contains(e.Id)).ToListAsync();

        PropertyInfo collProp = entity.GetType().GetProperty(prop);

        if (collProp is not null)
        {
            object coll = collProp.GetValue(entity, null);

            collProp.SetValue(entity, entities);

            await _context.SaveChangesAsync();
            return entity;

            //if (coll is ICollection<TColl> list)
            //{
            //    foreach (TColl el in entities)
            //    {
            //        list.Add(el);
            //    }

            //    collProp.SetValue(entity, list);
            //}
        }

        return entity;
    }

    private IQueryable<T> IncludeProperties(params Expression<Func<T, object>>[] properties)
    {
        IQueryable<T> query = _context.Set<T>();

        foreach (var property in properties) query = query.Include(property);

        return query;
    }

}

