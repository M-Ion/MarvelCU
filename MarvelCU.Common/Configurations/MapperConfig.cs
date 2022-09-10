using AutoMapper;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;

namespace MarvelCU.Common.Configurations;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<Actor, ActorDto>().ReverseMap();
        CreateMap<Actor, GetActorDto>().ReverseMap();

        CreateMap<News, CreateNewsDto>().ReverseMap();
        CreateMap<News, UpdateNewsDto>()
            .ReverseMap()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));
    }
}

