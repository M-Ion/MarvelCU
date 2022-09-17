using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Repositories;

public class HeroRepository : GenericRepository<Hero>, IHeroRepository
{
    public HeroRepository(MarvelDbContext context) : base(context)
    {
    }
}

