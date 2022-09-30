using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IActorService
{
    Task<List<GetActorDto>> GetAllActors();

    Task<ActorDto> GetActorDetails(int id);

    Task SupplyCollection<E>(ICollection<E> collection, E item) where E : BaseEntity;

    Task<Actor> Exists(int id);
}

