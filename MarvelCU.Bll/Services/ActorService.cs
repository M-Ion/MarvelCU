using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using MarvelCU.Common.Constants;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _actorRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly ICloudStorageManager _cloudStorageManager;
    private readonly IMapper _mapper;

    public ActorService(
        IActorRepository repository,
        IMovieRepository movieRepository,
        ICloudStorageManager cloudStorageManager,
        IMapper mapper
        )
    {
        _actorRepository = repository;
        _cloudStorageManager = cloudStorageManager;
        _movieRepository = movieRepository;
        _mapper = mapper;
    }

    public async Task<List<GetActorDto>> GetAllActors()
    {
        var actors = await _actorRepository.GetAllAsync();
        return _mapper.Map<List<GetActorDto>>(actors);
    }

    public async Task<ActorDto> GetActorDetails(int id)
    {
        await _actorRepository.Exists(id);

        var actor = await _actorRepository.GetEntityDetails(
            id,
            actor => actor.Movies,
            actor => actor.Heroes
            );

        return _mapper.Map<ActorDto>(actor); ;
    }

    public async Task CreateActor(CreateActorDto createActorDto)
    {
        var actor = _mapper.Map<Actor>(createActorDto);
        var entity = await _actorRepository.AddAsync(actor);

        // Upload actor's image if presented
        await _cloudStorageManager.UploadBlob(entity.Id.ToString(), AzureBlobContainers.ActorsImages, createActorDto.BlobFilePath);
    }

    public async Task SupplyCollection(int id, int entityId)
    {
        var actor = await _actorRepository.Exists(id);
        var movie = await _movieRepository.Exists(entityId);

        await _actorRepository.Supply(actor.Movies, movie);
    }
}

