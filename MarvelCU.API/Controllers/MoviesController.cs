using AutoMapper;
using MarvelCU.API.Infrastructure.Filters;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    [EnableQuery]
    public async Task<ActionResult<IList<GetMovieDto>>> GetAllMovie()
    {
        return Ok(await _movieService.GetMovies());
    }

    [HttpPost]
    //[Authorize(Roles = "Administrator")]
    public async Task<ActionResult> CreateMovie([FromBody] CreateMovieDto createMovieDto)
    {
        await _movieService.CreateMovie(createMovieDto);
        return Ok();
    }

    [HttpGet]
    [Route("Page")]
    [EnableQuery]
    public async Task<ActionResult<IList<GetMovieDto>>> GetPageMovie([FromQuery] PagedRequest pagedRequest)
    { 
        return Ok(await _movieService.GetPagedMovies(pagedRequest));
    }
        
    [HttpGet]
    [Route("{id}")]
    [ServiceFilter(typeof(EntityIdValidationFilter<Movie>))]
    public async Task<ActionResult<MovieDto>> GetMovie(int id)
    {
        var movie = await _movieService.GetMovieDetails(id);
        return Ok(movie);
    }
}

