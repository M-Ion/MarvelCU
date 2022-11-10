using MarvelCU.Common;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IHeroService
{
    Task<IList<GetHeroDto>> GetAllHeroes();

    Task<ProcessedResult<GetHeroDto>> GetAllHeroes(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task<HeroDto> GetHeroDetails(int id);

    Task UpdateHero(UpdateHeroDto dto, int id);

    Task DeleteHero(int id);

    Task AddHeroToFavourites(int heroId);

    Task RemoveFromFavourites(int heroId);

    Task SetBlob(int id, string uri);

    Task<IdDto> CreateHero(CreateHeroDto createHeroDto);
}

