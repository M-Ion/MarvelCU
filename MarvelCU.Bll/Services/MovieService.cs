﻿using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Extensions;
using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;
    private readonly ICloudStorageManager _cloudStorageManager;

    private readonly IMapper _mapper;

    public MovieService(IMovieRepository movieRepository, ICloudStorageManager cloudStorageManager, IMapper mapper)
    {
        _movieRepository = movieRepository;
        _cloudStorageManager = cloudStorageManager;
        _mapper = mapper;
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

    public async Task<IList<GetMovieDto>> GetMovies()
    {
        var movies = await _movieRepository.GetAllAsync();
        return _mapper.Map<IList<GetMovieDto>>(movies);
    }

    public async Task CreateMovie(CreateMovieDto createMovieDto)
    {
        var movie = _mapper.Map<Movie>(createMovieDto);
        var entity = await _movieRepository.AddAsync(movie);

        // Upload movie's image if presented
        await _cloudStorageManager.UploadBlob(entity.Id.ToString(), AzureBlobContainers.MoviesImages, createMovieDto.BlobFilePath);
    }

    public async Task<ProcessedResult<GetMovieDto>> GetMovies(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters)
    {
        ProcessedRequest request = new() { Paging = pagingRequest, Sorting = sortingRequest, Filters = filters };
        ProcessedResult<GetMovieDto> result = await _movieRepository.GetAllAsyncProcessed<GetMovieDto>(request, _mapper);

        return result;
    }
}

