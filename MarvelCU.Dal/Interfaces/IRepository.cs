namespace MarvelCU.Dal.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T> GetAsync(int id);
    Task<List<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task<T> RemoveAsync(int id);
}

