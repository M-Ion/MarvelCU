using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Hero;
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
        public async Task<ActionResult> CreateHero([FromBody] CreateHeroDto createHeroDto)
        {
            await _heroService.CreateHero(createHeroDto);
            return NoContent();
        }
    }
}
