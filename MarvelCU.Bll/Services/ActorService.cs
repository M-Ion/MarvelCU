using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _actorRepository;
    private readonly ICloudStorageManager _cloudStorageManager;

    private readonly IMapper _mapper;

    private readonly string _blobContainer = "actor-images";

    public ActorService(
        IActorRepository repository,
        ICloudStorageManager cloudStorageManager,
        IMapper mapper
        )
    {
        _actorRepository = repository;
        _cloudStorageManager = cloudStorageManager;

        _mapper = mapper;
    }

    public async Task<List<GetActorDto>> GetAllActors()
    {
        var actors = await _actorRepository.GetAllAsync();

        List<GetActorDto> actorsDtos = _mapper.Map<List<GetActorDto>>(actors);

        return actorsDtos;
    }

    public async Task<ActorDto> GetActorDetails(int id)
    {
        var actor = await _actorRepository.GetEntityDetails(
            id,
            actor => actor.Movies,
            actor => actor.Heroes
            );

        ActorDto actorDto = _mapper.Map<ActorDto>(actor);

        return actorDto;
    }

    public async Task CreateActor(CreateActorDto createActorDto)
    {
        var actor = _mapper.Map<Actor>(createActorDto);
        var entity = await _actorRepository.AddAsync(actor);

        await _cloudStorageManager.UploadBlob(entity.Id.ToString(), _blobContainer, createActorDto.BlobFilePath);
    }

    public async Task SupplyCollection<E>(ICollection<E> collection, E item) where E : BaseEntity
    {
        await _actorRepository.Supply(collection, item);
    }

    public async Task<Actor> Exists(int id)
    {
        return await _actorRepository.Exists(id);
    }
}

