using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Models;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface IMovieRepository : IRepository<Movie>
{
    Task RemoveFromCast(int movieId, Actor actor);

    Task<Movie> GetDetails(int id);

    Task<IList<Movie>> GetOrderedMovies();

    Task<IList<Movie>> GetPagedMovies(PagedRequest pagedRequest);
}

