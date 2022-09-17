namespace MarvelCU.Dal.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T> GetAsync(int id);

    Task<List<T>> GetAllAsync();

    Task<T> AddAsync(T entity);

    Task RemoveAsync(T entity);

    Task UpdateAsync(T entity);

    Task<bool> Exists(int id);
}

