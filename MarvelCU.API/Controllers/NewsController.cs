using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    private readonly INewsService _newsService;
    private readonly IMapper _mapper;

    public NewsController(INewsService newsService, IMapper mapper)
    {
        _newsService = newsService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<News>>> GetNews()
    {
        return Ok(await _newsService.GetAllNews());
    }

    [HttpPost]
    public async Task<ActionResult<News>> CreateNews([FromBody] CreateNewsDto createNewsDto)
    {
        var news = _mapper.Map<News>(createNewsDto);

        await _newsService.CreateNews(news);

        return Ok(news);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateNews(int id, [FromBody] UpdateNewsDto updateNewsDto)
    {
        var news = await _newsService.GetNews(id);

        if (news is null) return NotFound();

        _mapper.Map(updateNewsDto, news);

        await _newsService.UpdateNews(news);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteNews(int id)
    {
        var entity = await _newsService.GetNews(id);

        if (entity is null) return NotFound();

        await _newsService.DeleteNews(entity);

        return NoContent();
    }

}

