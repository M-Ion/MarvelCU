﻿using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Dtos.Payment;
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
    private readonly IPaymentService _paymentService;

    public MoviesController(IMovieService movieService, IPaymentService paymentService)
    {
        _movieService = movieService;
        _paymentService = paymentService;
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

    [HttpPost("Favourite/{id}")]
    [Authorize]
    public async Task<ActionResult> AddMovieToFavourites(int id)
    {
        await _movieService.AddMovieToFavourites(id);
        return NoContent();
    }

    [HttpDelete("Favourite/{id}")]
    [Authorize]
    public async Task<ActionResult> RemoveMovieFromFavourites(int id)
    {
        await _movieService.RemoveFromFavourites(id);
        return NoContent();
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

    [HttpPost("Buy/{id}")]
    [Authorize]
    public async Task<ActionResult> Buy(int id, [FromBody] PaymentDto paymentDto)
    {
        var charged = await _paymentService.ProcessPayment(paymentDto);
        if (charged)
        {
            await _movieService.AddBoughtMovie(id);
            return NoContent();
        }

        return BadRequest();
    }
}

