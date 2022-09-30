using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class NewsService : INewsService
{
    private readonly INewsRepository _repository;
    private readonly IMapper _mapper;

    public NewsService(INewsRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<News> GetNews(int id)
    {
        return await _repository.Exists(id);
    }

    public async Task<List<News>> GetAllNews()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<News> CreateNews(CreateNewsDto createNewsDto)
    {
        var news = _mapper.Map<News>(createNewsDto);

        return await _repository.AddAsync(news); ;
    }

    public async Task UpdateNews(int id, UpdateNewsDto updateNewsDto)
    {
        var news = await _repository.Exists(id);
        _mapper.Map(updateNewsDto, news);

        await _repository.UpdateAsync(news);
    }

    public async Task DeleteNews(News news)
    {
        await _repository.RemoveAsync(news);
    }

    public async Task<News> Exists(int id)
    {
       return await _repository.Exists(id);
    }
}

