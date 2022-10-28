using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Extensions;
using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
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
    public async Task<ActionResult<IList<GetMovieDto>>> GetAllMovie()
    {
        var movies = await _movieService.GetMovies();
        return Ok(movies);
    }

    // For processing request
    [HttpPost]
    [Route("Filter")]
    public async Task<ActionResult<IList<GetMovieDto>>> GetMoviesByFilters(
        [FromQuery] PagingRequest paging,
        [FromQuery] SortingRequest sorting,
        [FromBody] IList<Filter> filters
        )
    {
        var movies = await _movieService.GetMovies(paging, sorting, filters);
        return Ok(movies);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<MovieDto>> GetMovie(int id)
    {
        var movie = await _movieService.GetMovieDetails(id);
        return Ok(movie);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> CreateMovie([FromBody] CreateMovieDto createMovieDto)
    {
        await _movieService.CreateMovie(createMovieDto);
        return Ok();
    }
}

