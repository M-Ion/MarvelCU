using MarvelCU.Common;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Models.Processing;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IActorService
{
    Task<List<GetActorDto>> GetAllActors();

    Task<ProcessedResult<GetActorDto>> GetActors(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters);

    Task<ActorDto> GetActorDetails(int id);

    Task DeleteActor(int id);

    Task UpdateActor(UpdateActorDto dto, int id);

    Task AddActorToFavourites(int actorId);

    Task RemoveFromFavourites(int actorId);

    Task<IdDto> CreateActor(CreateActorDto createActorDto);

    Task SupplyCollection(int id, int entityId);

    Task SetBlob(int id, string uri);
}

