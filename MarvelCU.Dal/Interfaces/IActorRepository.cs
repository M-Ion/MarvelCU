using MarvelCU.Domain;

namespace MarvelCU.Dal.Interfaces;

public interface IActorRepository : IRepository<Actor>
{
    Task<Actor> GetActorDetails(int id);
}

