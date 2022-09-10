using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface INewsService
{
    Task<List<News>> GetAllNews();

    Task CreateNews(News news);

    Task DeleteNews(News news);

    Task<News> GetNews(int id);

    Task UpdateNews(News news);
}

