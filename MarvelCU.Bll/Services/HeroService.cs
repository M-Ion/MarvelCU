﻿using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class HeroService : IHeroService
{
    private readonly IHeroRepository _heroRepository;
    private readonly ICloudStorageManager _cloudStorageManager;

    private readonly IMapper _mapper;

    private readonly string _blobContainer = "hero-images";

    public HeroService(IHeroRepository heroRepository, ICloudStorageManager cloudStorageManager, IMapper mapper)
    {
        _heroRepository = heroRepository;
        _cloudStorageManager = cloudStorageManager;
        _mapper = mapper;
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

        var heroDto = _mapper.Map<HeroDto>(hero);

        return heroDto;
    }

    public async Task CreateHero(CreateHeroDto createHeroDto)
    {
        var hero = _mapper.Map<Hero>(createHeroDto);
        var entity = await _heroRepository.AddAsync(hero);

        await _cloudStorageManager.UploadBlob(entity.Id.ToString(), _blobContainer, createHeroDto.BlobFilePath);
    }
}

