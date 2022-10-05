using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface INewsService
{
    Task<List<News>> GetAllNews();

    Task CreateNews(CreateNewsDto createNewsDto);

    Task DeleteNews(int id);

    Task UpdateNews(int id, UpdateNewsDto news);
}

