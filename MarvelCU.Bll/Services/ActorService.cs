using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using MarvelCU.Common.Constants;
using MarvelCU.Common.Models.Processing;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _actorRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly ICloudStorageManager _cloudStorageManager;
    private readonly ICurrentUser _currentUser;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public ActorService(
        IActorRepository repository,
        IMovieRepository movieRepository,
        ICloudStorageManager cloudStorageManager,
        UserManager<User> userManager,
        IMapper mapper,
        ICurrentUser currentUser
        )
    {
        _actorRepository = repository;
        _cloudStorageManager = cloudStorageManager;
        _movieRepository = movieRepository;
        _mapper = mapper;
        _currentUser = currentUser;
        _userManager = userManager;
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
        //await _cloudStorageManager.UploadBlob(entity.Id.ToString(), AzureBlobContainers.ActorsImages, createActorDto.BlobFilePath);
    }

    public async Task SupplyCollection(int id, int entityId)
    {
        var actor = await _actorRepository.Exists(id);
        var movie = await _movieRepository.Exists(entityId);

        await _actorRepository.Supply(actor.Movies, movie);
    }

    public async Task AddActorToFavourites(int actorId)
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);
        Actor actor = await _actorRepository.Exists(actorId);

        user.FavouriteActors.Add(actor);

        await _userManager.UpdateAsync(user);
    }

    public async Task<ProcessedResult<GetActorDto>> GetActors(PagingRequest pagingRequest, SortingRequest sortingRequest, IList<Filter> filters)
    {
        ProcessedRequest request = new() { Paging = pagingRequest, Sorting = sortingRequest, Filters = filters };
        ProcessedResult<GetActorDto> result = await _actorRepository.GetAllAsyncProcessed<GetActorDto>(request, _mapper);

        return result;
    }
}

