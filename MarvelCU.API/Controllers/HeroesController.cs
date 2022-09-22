using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Hero;
using Microsoft.AspNetCore.Http;
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
            return Ok(await _heroService.GetAllHeroes());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HeroDto>> GetHero(int id)
        {
            return Ok(await _heroService.GetHeroDetails(id));
        }

        [HttpPost]
        //[Authorize(Roles = "Administrator")]
        public async Task<ActionResult> CreateHero([FromBody] CreateHeroDto createHeroDto)
        {
            await _heroService.CreateHero(createHeroDto);
            return NoContent();
        }

    }
}
