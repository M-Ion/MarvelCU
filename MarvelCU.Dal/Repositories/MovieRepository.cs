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
}

