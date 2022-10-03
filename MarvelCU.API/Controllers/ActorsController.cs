using AutoMapper;
using MarvelCU.API.Infrastructure.Filters;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ActorsController : ControllerBase
{
    private readonly IActorService _actorService;
    private readonly ICloudStorageService _cloudStorageService;

    public ActorsController(IActorService actorService, ICloudStorageService cloudStorageService)
    {
        _actorService = actorService;
        _cloudStorageService = cloudStorageService;

    }

    [HttpGet]
    public async Task<ActionResult<List<GetActorDto>>> GetActors()
    {
        var actors = await _actorService.GetAllActors();
        return Ok(actors);
    }

    [HttpGet("{id}")]
    [ServiceFilter(typeof(EntityIdValidationFilter<Actor>))]
    public async Task<ActionResult<ActorDto>> GetActor(int id)
    {
        var actor = await _actorService.GetActorDetails(id);
        return Ok(actor);
    }

    [HttpPost]
    public async Task<ActionResult> CreateActor([FromBody] CreateActorDto createActorDto)
    {
        await _actorService.CreateActor(createActorDto);
        return Ok();
    }

    // id - Actor Id
    // entityId - Movie Id

    [HttpPut("Movies/{id}/{entityId}")]
    //[Authorize(Roles = "Administrator")]
    [ServiceFilter(typeof(EntityIdValidationFilter<Actor, Movie>))]
    public async Task<ActionResult> UpdateActorMovies(int id, int entityId)
    {
        var actor = HttpContext.Items["Entity"] as Actor;
        var movie = HttpContext.Items["SecondEntity"] as Movie;

        await _actorService.SupplyCollection(actor.Movies, movie);
        return NoContent();
    }

    // id - Actor Id
    // entityId - Hero Id

    [HttpPut("Heroes/{id}/{entityId}")]
    //[Authorize(Roles = "Administrator")]
    [ServiceFilter(typeof(EntityIdValidationFilter<Actor, Hero>))]
    public async Task<ActionResult> UpdateActorHeroes(int id, int entityId)
    {
        var actor = HttpContext.Items["Entity"] as Actor;
        var hero = HttpContext.Items["SecondEntity"] as Hero;

        await _actorService.SupplyCollection(actor.Heroes, hero);
        return Ok();
    }
}

