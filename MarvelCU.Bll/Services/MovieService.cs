﻿using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Extensions;
using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;
    private readonly ICloudStorageManager _cloudStorageManager;
    private readonly ICurrentUser _currentUser;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public MovieService(IMovieRepository movieRepository, UserManager<User> userManager, ICloudStorageManager cloudStorageManager, IMapper mapper, ICurrentUser currentUser)
    {
        _movieRepository = movieRepository;
        _cloudStorageManager = cloudStorageManager;
        _mapper = mapper;
        _currentUser = currentUser;
        _userManager = userManager;
    }
    public async Task<IList<GetMovieDto>> GetMovies()
    {
        var movies = await _movieRepository.GetAllAsync();
        return _mapper.Map<IList<GetMovieDto>>(movies);
    }

    public async Task<MovieDto> GetMovieDetails(int id)
    {
        await _movieRepository.Exists(id);

        var movie = await _movieRepository.GetEntityDetails(
            id,
            movie => movie.Actors,
            movie => movie.Heroes,
            movie => movie.Reviews
            );

        return _mapper.Map<MovieDto>(movie);
    }


    public async Task<IdDto> CreateMovie(CreateMovieDto dto)
    {
        var movie = _mapper.Map<Movie>(dto);
        var entity = await _movieRepository.AddAsync(movie);

        if (dto.ActorsIds is not null)
        {
            entity = await _movieRepository.UpdateCollection<Actor>(entity, dto.ActorsIds, nameof(entity.Actors));
        }

        if (dto.HeroesIds is not null)
        {
            entity = await _movieRepository.UpdateCollection<Hero>(entity, dto.HeroesIds, nameof(entity.Heroes));
        }

        return new IdDto { Id = entity.Id };
    }

    public async Task UpdateMovie(UpdateMovieDto dto, int id)
    {
        Movie entity = await _movieRepository.Exists(id);
        _mapper.Map(dto, entity);

        if (dto.ActorsIds is not null)
        {
            entity = await _movieRepository.UpdateCollection<Actor>(entity, dto.ActorsIds, nameof(entity.Actors));
        }

        if (dto.HeroesIds is not null)
        {
            entity = await _movieRepository.UpdateCollection<Hero>(entity, dto.HeroesIds, nameof(entity.Heroes));
        }

        await _movieRepository.UpdateAsync(entity);
    }

    public async Task DeleteMovie(int id)
    {
        Movie entity = await _movieRepository.Exists(id);
        await _movieRepository.RemoveAsync(entity);
    }
    public async Task<ProcessedResult<GetMovieDto>> GetMovies(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters)
    {
        ProcessedRequest request = new() { Paging = pagingRequest, Sorting = sortingRequest, Filters = filters };
        ProcessedResult<GetMovieDto> result = await _movieRepository.GetAllAsyncProcessed<GetMovieDto>(request, _mapper);

        return result;
    }

    public async Task AddMovieToFavourites(int movieId)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);
        Movie movie = await _movieRepository.Exists(movieId);

        user.FavouriteMovies.Add(movie);
        await _userManager.UpdateAsync(user);

    }

    public async Task RemoveFromFavourites(int movieId)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);

        Movie movie = user.FavouriteMovies.FirstOrDefault(m => m.Id == movieId);

        if (movie is not null)
        {
            user.FavouriteMovies.Remove(movie);
            await _userManager.UpdateAsync(user);
        }
    }


    public async Task AddBoughtMovie(int id)
    {
        var movie = await _movieRepository.Exists(id);

        var user = await _userManager.FindByIdAsync(_currentUser.Id);

        if (user is not null)
        {
            user.BoughtMovies.Add(movie);
            await _userManager.UpdateAsync(user);
        }
    }

    public async Task SetBlob(int id, string uri)
    {
        Movie movie = await _movieRepository.Exists(id);
        movie.Blob = uri;

        await _movieRepository.UpdateAsync(movie);
    }

    public async Task SetVideoBlob(int id, string uri)
    {
        Movie movie = await _movieRepository.Exists(id);
        movie.VideoBlob = uri;

        await _movieRepository.UpdateAsync(movie);
    }
}

