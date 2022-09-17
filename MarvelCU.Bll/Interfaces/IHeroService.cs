﻿using MarvelCU.Common.Dtos.Hero;

namespace MarvelCU.Bll.Interfaces;

public interface IHeroService
{
    Task<IList<GetHeroDto>> GetAllHeroes();

    Task<HeroDto> GetHeroDetails(int id);

    Task CreateHero(CreateHeroDto createHeroDto);
}

