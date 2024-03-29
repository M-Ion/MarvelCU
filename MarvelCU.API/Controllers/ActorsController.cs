﻿using MarvelCU.Bll.Interfaces;
using MarvelCU.Common;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Models.Processing;
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
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IdDto>> CreateActor([FromBody] CreateActorDto createActorDto)
    {
        IdDto res = await _actorService.CreateActor(createActorDto);
        return Ok(res);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateActor([FromBody] UpdateActorDto updateActorDto, [FromRoute] int id)
    {
        await _actorService.UpdateActor(updateActorDto, id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteActor(int id)
    {
        await _actorService.DeleteActor(id);
        return NoContent();
    }

    [HttpPost("Favourite/{id}")]
    [Authorize]
    public async Task<ActionResult> AddActorToFavourites(int id)
    {
        await _actorService.AddActorToFavourites(id);
        return NoContent();
    }

    [HttpDelete("Favourite/{id}")]
    [Authorize]
    public async Task<ActionResult> RemoveHeroFromFavourites(int id)
    {
        await _actorService.RemoveFromFavourites(id);
        return NoContent();
    }

    [HttpPost("Filter")]
    public async Task<ActionResult<IList<GetActorDto>>> GetActorsByFilters(
        [FromQuery] PagingRequest paging,
        [FromQuery] SortingRequest sorting,
        [FromBody] IList<Filter> filters
        )
    {
        var actors = await _actorService.GetActors(paging, sorting, filters);
        return Ok(actors);
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

