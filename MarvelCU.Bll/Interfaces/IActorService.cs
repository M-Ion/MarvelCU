using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IActorService
{
    Task<List<Actor>> GetAllActors();

    Task<Actor> GetActor(int id);

    Task<ActorDto> GetActorDetails(int id);
}

