using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
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
        return Ok(actor);
    }

    [HttpPost]
    public async Task<ActionResult> CreateActor([FromBody] CreateActorDto createActorDto)
    {
        await _actorService.CreateActor(createActorDto);
        return Ok();
    }

    [HttpPut("Movies/{id}/{movieId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateActorMovies(int id, int movieId)
    {
        await _actorService.SupplyCollection(id, movieId);
        return NoContent();
    }


    [HttpPut("Heroes/{id}/{heroId}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateActorHeroes(int id, int heroId)
    {
        await _actorService.SupplyCollection(id, heroId);
        return Ok();
    }
}

