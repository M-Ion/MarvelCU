using MarvelCU.Common.Dtos.News;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface INewsService
{
    Task<List<News>> GetAllNews();

    Task<ProcessedResult<News>> GetAllNews(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task CreateNews(CreateNewsDto createNewsDto);

    Task DeleteNews(int id);

    Task UpdateNews(int id, UpdateNewsDto news);
}

