using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class MovieService : IMovieService
{
    private readonly IMovieRepository _repository;
    private readonly ICloudStorageManager _cloudStorageManager;

    private readonly IMapper _mapper;

    private readonly string _blobContainer = "movie-images";

    public MovieService(IMovieRepository repository, ICloudStorageManager cloudStorageManager, IMapper mapper)
    {
        _repository = repository;
        _cloudStorageManager = cloudStorageManager;
        _mapper = mapper;
    }

    public async Task<MovieDto> GetMovieDetails(int id)
    {
        var movie = await _repository.GetEntityDetails(
            id,
            movie => movie.Actors,
            movie => movie.Heroes,
            movie => movie.Reviews
            );

        return _mapper.Map<MovieDto>(movie);
    }

    public async Task<IList<GetMovieDto>> GetMovies()
    {
        var movies = await _repository.GetOrderedMovies();
        return _mapper.Map<IList<GetMovieDto>>(movies);
    }

    public async Task<IList<GetMovieDto>> GetPagedMovies(PagedRequest pagedRequest)
    {
        var movies =  (await _repository.GetPagedMovies(pagedRequest)).ToList();
        return _mapper.Map<IList<GetMovieDto>>(movies);
    }

    public async Task CreateMovie(CreateMovieDto createMovieDto)
    {
        var movie = _mapper.Map<Movie>(createMovieDto);
        var entity = await _repository.AddAsync(movie);

        await _cloudStorageManager.UploadBlob(entity.Id.ToString(), _blobContainer, createMovieDto.BlobFilePath);
    }
}

