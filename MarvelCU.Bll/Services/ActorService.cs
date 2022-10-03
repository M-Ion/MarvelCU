using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _actorRepository;
    private readonly ICloudStorageService _cloudStorageService;

    private readonly IMapper _mapper;

    public ActorService(
        IActorRepository repository,
        ICloudStorageService cloudStorageService,
        IMapper mapper
        )
    {
        _actorRepository = repository;
        _cloudStorageService = cloudStorageService;

        _mapper = mapper;
    }

    public async Task<List<GetActorDto>> GetAllActors()
    {
        var actors = await _actorRepository.GetAllAsync();
        return _mapper.Map<List<GetActorDto>>(actors);
    }

    public async Task<ActorDto> GetActorDetails(int id)
    {
        var actor = await _actorRepository.GetEntityDetails(
            id,
            actor => actor.Movies, 
            actor => actor.Heroes
            );

        return _mapper.Map<ActorDto>(actor);
    }

    public async Task CreateActor(CreateActorDto createActorDto)
    {
        var actor = _mapper.Map<Actor>(createActorDto);
        var entity = await _actorRepository.AddAsync(actor);

        await _cloudStorageService.UploadBlob(entity.Id.ToString(), "actor-images", createActorDto.BlobFilePath);
    }

    public async Task SupplyCollection<E>(ICollection<E> collection, E item) where E : BaseEntity
    {
        await _actorRepository.Supply<E>(collection, item);
    }

    public async Task<Actor> Exists(int id)
    {
        return await _actorRepository.Exists(id);
    }
}

