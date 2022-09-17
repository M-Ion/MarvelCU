using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Domain;

namespace MarvelCU.Common.Configurations;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<Actor, ActorDto>().ReverseMap();
        CreateMap<Actor, GetActorDto>().ReverseMap();

        CreateMap<Hero, GetHeroDto>().ReverseMap();

        CreateMap<Movie, MovieDto>().ReverseMap();
        CreateMap<Movie, GetMovieDto>().ReverseMap();
        CreateMap<Movie, CreateMovieDto>().ReverseMap();

        CreateMap<News, CreateNewsDto>().ReverseMap();
        CreateMap<News, UpdateNewsDto>()
            .ReverseMap()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));
    }
}

