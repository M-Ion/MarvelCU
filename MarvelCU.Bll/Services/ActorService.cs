using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _actorRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly IHeroRepository _heroRepository;

    private readonly IMapper _mapper;

    public ActorService(
        IActorRepository repository, 
        IMovieRepository movieRepository, 
        IHeroRepository heroRepository,
        IMapper mapper)
    {
        _actorRepository = repository;
        _movieRepository = movieRepository;
        _heroRepository = heroRepository;
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

        var actor = await _actorRepository.GetActorDetails(id);

        return _mapper.Map<ActorDto>(actor);
    }

    public async Task<ActorDto> AddActorToCast(int actorId, int movieId)
    {
        var movie = await _movieRepository.Exists(movieId);
        var actor = await _actorRepository.Exists(actorId);

        actor.Movies.Add(movie);
        await _actorRepository.UpdateAsync(actor);

        return _mapper.Map<ActorDto>(actor);
    }

    public async Task<ActorDto> AddActorToHero(int actorId, int heroId)
    {
        var hero = await _heroRepository.Exists(heroId);
        var actor = await _actorRepository.Exists(actorId);

        actor.Heroes.Add(hero);
        await _actorRepository.UpdateAsync(actor);

        return _mapper.Map<ActorDto>(actor);
    }

    public async Task<Actor> Exists(int id)
    {
        return await _actorRepository.Exists(id);
    }
}

