using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NewsController : ControllerBase
{
    private readonly INewsService _newsService;

    public NewsController(INewsService newsService)
    {
        _newsService = newsService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<List<News>>> GetNews()
    {
        return Ok(await _newsService.GetAllNews());
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> CreateNews([FromBody] CreateNewsDto createNewsDto)
    {
        await _newsService.CreateNews(createNewsDto);
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateNews(int id, [FromBody] UpdateNewsDto updateNewsDto)
    {
        await _newsService.UpdateNews(id, updateNewsDto);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> RemoveNews(int id)
    {
        await _newsService.DeleteNews(id);
        return NoContent();
    }
}

