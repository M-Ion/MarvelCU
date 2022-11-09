using MarvelCU.Bll.Interfaces;
using MarvelCU.Common;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroesController : ControllerBase
    {
        private readonly IHeroService _heroService;

        public HeroesController(IHeroService heroService)
        {
            _heroService = heroService;
        }

        [HttpGet]
        public async Task<ActionResult<GetHeroDto>> GetHeroes()
        {
            var heroes = await _heroService.GetAllHeroes();
            return Ok(heroes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HeroDto>> GetHero(int id)
        {
            var hero = await _heroService.GetHeroDetails(id);
            return Ok(hero);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IdDto>> CreateHero([FromBody] CreateHeroDto createHeroDto)
        {
            IdDto res = await _heroService.CreateHero(createHeroDto);
            return Ok(res);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteHero(int id)
        {
            await _heroService.DeleteHero(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateMovie([FromBody] UpdateHeroDto updateHeroDto, [FromRoute] int id)
        {
            await _heroService.UpdateHero(updateHeroDto, id);
            return NoContent();
        }

        // For processing request
        [HttpPost]
        [Route("Filter")]
        public async Task<ActionResult<IList<GetHeroDto>>> GetMoviesByFilters(
            [FromQuery] PagingRequest paging,
            [FromQuery] SortingRequest sorting,
            [FromBody] IList<Filter> filters
            )
        {
            var movies = await _heroService.GetAllHeroes(paging, sorting, filters);
            return Ok(movies);
        }



        [HttpPost("Favourite/{id}")]
        [Authorize]
        public async Task<ActionResult> AddHeroToFavourites(int id)
        {
            await _heroService.AddHeroToFavourites(id);
            return NoContent();
        }

        [HttpDelete("Favourite/{id}")]
        [Authorize]
        public async Task<ActionResult> RemoveHeroFromFavourites(int id)
        {
            await _heroService.RemoveFromFavourites(id);
            return NoContent();
        }
    }
}
