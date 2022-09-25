using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.Dal.Repositories;

public class HeroRepository : GenericRepository<Hero>, IHeroRepository
{
    private readonly MarvelDbContext _context;

    public HeroRepository(MarvelDbContext context) : base(context)
    {
        _context = context;
    }
}

