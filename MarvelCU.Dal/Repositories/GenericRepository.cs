﻿using MarvelCU.Common.Exceptions;
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
        return entity ?? throw new IdNotFoundException($"{typeof(T)} not found with that id!");
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
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

    public async Task UpdateAsync(T entity)
    {
        _context.Update(entity);
        await _context.SaveChangesAsync();
    }

    //public async Task Supply<E>(int id, E entityToAdd) where E : BaseEntity
    //{
    //    T entity = await GetAsync(id);

    //    PropertyInfo property = typeof(T).GetProperties().FirstOrDefault(prop => prop.PropertyType == typeof(ICollection<E>));

    //    if (property is not null && entity is not null)
    //    {
    //        dynamic collection = typeof(T).GetProperty(property.Name).GetValue(entity);
    //        collection.Add(entityToAdd);

    //        await _context.SaveChangesAsync();
    //    }
    //}

    private IQueryable<T> IncludeProperties(params Expression<Func<T, object>>[] properties)
    {
        IQueryable<T> query = _context.Set<T>();

        foreach(var property in properties) query = query.Include(property);
      
        return query;
    }
}

