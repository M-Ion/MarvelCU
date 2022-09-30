using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class HeroService : IHeroService
{
    private readonly IHeroRepository _heroRepository;
    private readonly IMapper _mapper;

    public HeroService(IHeroRepository heroRepository, IMapper mapper)
    {
        _heroRepository = heroRepository;
        _mapper = mapper;
    }

    public async Task CreateHero(CreateHeroDto createHeroDto)
    {
        var hero = _mapper.Map<Hero>(createHeroDto);
        await _heroRepository.AddAsync(hero);
    }

    public async Task<IList<GetHeroDto>> GetAllHeroes()
    {
        var heroes = await _heroRepository.GetAllAsync();
        return _mapper.Map<IList<GetHeroDto>>(heroes);
    }

    public async Task<HeroDto> GetHeroDetails(int id)
    {
        var hero = await _heroRepository.GetEntityDetails(
            id,
            hero => hero.Movies,
            hero => hero.Actors
            );
        return _mapper.Map<HeroDto>(hero);
    }
}

