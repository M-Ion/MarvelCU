using MarvelCU.Common.Models;
using MarvelCU.Dal.Extensions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

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

    public async Task<IList<Movie>> GetPagedMovies(PagedRequest pagedRequest)
    {
        return await _context.Movies.Paginate(pagedRequest).ToListAsync();
    }
}

