using MarvelCU.Common.Models;
using MarvelCU.Dal.Extensions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.Dal.Repositories;

public class MovieRepository : GenericRepository<Movie>, IMovieRepository
{
    private readonly MarvelDbContext _context;

    public MovieRepository(MarvelDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IList<Movie>> GetOrderedMovies()
    {
        return await _context.Movies.OrderBy(m => m.Premiere).ToListAsync();
    }

    public async Task RemoveFromCast(int movieId, Actor actor)
    {
        using (var transaction = _context.Database.BeginTransaction())
        {
            try
            {
                await RemoveActor(movieId, actor);

                transaction.Rollback();
                //transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
        }
    }

    public async Task<IList<Movie>> GetPagedMovies(PagedRequest pagedRequest)
    {
        return await _context.Movies.Paginate(pagedRequest).ToListAsync();
    }

    private async Task RemoveActor(int movieId, Actor actor)
    {
        var movie = await _context.Movies.Include(m => m.Actors).Where(m => m.Id == movieId).FirstOrDefaultAsync();

        movie.Actors.Remove(actor);

        await _context.SaveChangesAsync();
    }
}

