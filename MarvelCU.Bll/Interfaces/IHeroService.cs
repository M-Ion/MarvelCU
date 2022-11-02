﻿using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IHeroService
{
    Task<IList<GetHeroDto>> GetAllHeroes();

    Task<ProcessedResult<GetHeroDto>> GetAllHeroes(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task<HeroDto> GetHeroDetails(int id);

    Task AddHeroToFavourites(int heroId);

    Task CreateHero(CreateHeroDto createHeroDto);
}

