
using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface IHeroRepository : IRepository<Hero>
{
    public Task<Hero> GetHeroDetails(int id);
}

