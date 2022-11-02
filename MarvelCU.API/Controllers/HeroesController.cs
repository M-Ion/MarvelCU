using MarvelCU.Bll.Interfaces;
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

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CreateHero([FromBody] CreateHeroDto createHeroDto)
        {
            await _heroService.CreateHero(createHeroDto);
            return NoContent();
        }

        [HttpPost("Favourite/{id}")]
        [Authorize]
        public async Task<ActionResult> AddHeroToFavourites(int id)
        {
            await _heroService.AddHeroToFavourites(id);
            return NoContent();
        }
    }
}
