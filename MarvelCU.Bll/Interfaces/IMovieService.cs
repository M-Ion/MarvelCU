using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IMovieService
{
    Task<MovieDto> GetMovieDetails(int id);

    Task<IList<GetMovieDto>> GetMovies();

    Task<IList<GetMovieDto>> GetPagedMovies(PagedRequest pagedRequest);

    Task CreateMovie(CreateMovieDto createMovieDto);
}

