using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IActorService
{
    Task<List<GetActorDto>> GetAllActors();

    Task<ActorDto> GetActorDetails(int id);

    Task CreateActor(CreateActorDto createActorDto);

    Task SupplyCollection(int id, int entityId);
}

