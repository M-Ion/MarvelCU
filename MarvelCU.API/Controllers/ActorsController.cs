using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ActorsController : ControllerBase
{
    private readonly IActorService _actorService;

    public ActorsController(IActorService actorService)
    {
        _actorService = actorService;
    }

    [HttpGet]
    public async Task<ActionResult<List<GetActorDto>>> GetActors()
    {
        var actors = await _actorService.GetAllActors();

        return Ok(actors);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActorDto>> GetActor(int id)
    {
        var actor = await _actorService.GetActorDetails(id);

        if (actor is null) return NotFound();

        return Ok(actor);
    }

    [HttpPut("Movies/{actorId}/{movieId}")]
    public async Task<ActionResult> UpdateActorMovies(int actorId, int movieId)
    {
        var updatedActor = await _actorService.AddActorToCast(actorId, movieId);

        if (updatedActor is null) return NotFound();

        return Ok();
    }

    [HttpPut("Heroes/{actorId}/{heroId}")]
    public async Task<ActionResult> UpdateActorHeroes(int actorId, int heroId)
    {
        var updatedActor = await _actorService.AddActorToCast(actorId, heroId);

        if (updatedActor is null) return NotFound();

        return Ok();
    }
}

