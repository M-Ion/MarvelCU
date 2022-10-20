using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IMovieService
{
    Task<MovieDto> GetMovieDetails(int id);

    Task<IList<GetMovieDto>> GetMovies();

    Task<ProcessedResult<GetMovieDto>> GetMovies(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task CreateMovie(CreateMovieDto createMovieDto);
}

