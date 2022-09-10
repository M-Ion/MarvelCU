using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class NewsService : INewsService
{
    private readonly INewsRepository _repository;

    public NewsService(INewsRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<News>> GetAllNews()
    {
        return await _repository.GetAllAsync();
    }

    public async Task CreateNews(News news)
    {
        await _repository.AddAsync(news);
    }

    public async Task DeleteNews(News news)
    {
        await _repository.RemoveAsync(news);
    }

    public async Task<News> GetNews(int id)
    {
        return await _repository.GetAsync(id);
    }

    public async Task UpdateNews(News news)
    {
        await _repository.UpdateAsync(news);
    }
}

