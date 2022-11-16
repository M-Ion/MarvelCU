using MarvelCU.API.Models.Movie;
using MarvelCU.Common;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IMovieService
{
    Task<MovieDto> GetMovieDetails(int id);

    Task<IList<GetMovieDto>> GetMovies();

    Task AddMovieToFavourites(int movieId);

    Task UpdateMovie(UpdateMovieDto dto, int id);

    Task DeleteMovie(int id);

    Task RemoveFromFavourites(int movieId);

    Task AddBoughtMovie(int id);

    Task SetBlob(int id, string uri);

    Task SetVideoBlob(int id, string uri);

    Task<ProcessedResult<GetMovieDto>> GetMovies(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task<IdDto> CreateMovie(CreateMovieDto createMovieDto);
}

