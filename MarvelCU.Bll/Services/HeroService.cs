using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class HeroService : IHeroService
{
    private readonly IHeroRepository _heroRepository;
    private readonly ICloudStorageManager _cloudStorageManager;
    private readonly UserManager<User> _userManager;
    private readonly ICurrentUser _currentUser;
    private readonly IMapper _mapper;

    public HeroService(
        IHeroRepository heroRepository, 
        ICurrentUser currentUser, 
        UserManager<User> userManager, 
        ICloudStorageManager cloudStorageManager, 
        IMapper mapper)
    {
        _heroRepository = heroRepository;
        _cloudStorageManager = cloudStorageManager;
        _mapper = mapper;
        _userManager = userManager;
        _currentUser = currentUser;
    }

    public async Task<IList<GetHeroDto>> GetAllHeroes()
    {
        var heroes = await _heroRepository.GetAllAsync();
        return _mapper.Map<IList<GetHeroDto>>(heroes);
    }

    public async Task<HeroDto> GetHeroDetails(int id)
    {
        await _heroRepository.Exists(id);

        var hero = await _heroRepository.GetEntityDetails(
            id,
            hero => hero.Movies,
            hero => hero.Actors
            );

        return _mapper.Map<HeroDto>(hero);
    }

    public async Task<IdDto> CreateHero(CreateHeroDto createHeroDto)
    {
        var hero = _mapper.Map<Hero>(createHeroDto);
        var entity = await _heroRepository.AddAsync(hero);

        return new IdDto() { Id = entity.Id };
    }

    public async Task UpdateHero(UpdateHeroDto dto, int id)
    {
        Hero entity = await _heroRepository.Exists(id);
        _mapper.Map(dto, entity);

        await _heroRepository.UpdateAsync(entity);
    }

    public async Task DeleteHero(int id)
    {
        Hero entity = await _heroRepository.Exists(id);
        await _heroRepository.RemoveAsync(entity);
    }

    public async Task AddHeroToFavourites(int heroId)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);
        Hero hero = await _heroRepository.Exists(heroId);

        user.FavouriteHeroes.Add(hero);

        await _userManager.UpdateAsync(user);
    }

    public async Task RemoveFromFavourites(int heroId)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);

        Hero hero = user.FavouriteHeroes.FirstOrDefault(m => m.Id == heroId);

        if (hero is not null)
        {
            user.FavouriteHeroes.Remove(hero);
            await _userManager.UpdateAsync(user);
        }
    }

    public async Task<ProcessedResult<GetHeroDto>> GetAllHeroes(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters)
    {
        ProcessedRequest request = new() { Paging = pagingRequest, Sorting = sortingRequest, Filters = filters };
        ProcessedResult<GetHeroDto> result = await _heroRepository.GetAllAsyncProcessed<GetHeroDto>(request, _mapper);

        return result;
    }

    public async Task SetBlob(int id, string uri)
    {
        Hero hero = await _heroRepository.Exists(id);
        hero.Blob = uri;

        await _heroRepository.UpdateAsync(hero);
    }
}

