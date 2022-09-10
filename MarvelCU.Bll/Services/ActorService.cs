using MarvelCU.Bll.Interfaces;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using AutoMapper;
using MarvelCU.Common.Dtos.Actor;

namespace MarvelCU.Bll.Services;

public class ActorService : IActorService
{
    private readonly IActorRepository _repository;
    private readonly IMapper _mapper;

    public ActorService(IActorRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<List<Actor>> GetAllActors()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Actor> GetActor(int id)
    {
        return await _repository.GetAsync(id);
    }

    public async Task<ActorDto> GetActorDetails(int id)
    {
        var actor = await _repository.GetActorDetails(id);
        var record = _mapper.Map<ActorDto>(actor);

        return record;
    }
}

