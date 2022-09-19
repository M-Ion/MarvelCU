using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IActorService
{
    Task<List<GetActorDto>> GetAllActors();

    Task<ActorDto> GetActorDetails(int id);

    Task<ActorDto> AddActorToCast(int actorId, int movieId);

    Task<ActorDto> AddActorToHero(int actorId, int heroId);

    Task<Actor> Exists(int id);
}

