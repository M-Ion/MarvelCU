using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;

namespace MarvelCU.Common.Configurations;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<Actor, ActorDto>().ReverseMap();
        CreateMap<Actor, GetActorDto>().ReverseMap();

        CreateMap<Hero, HeroDto>().ReverseMap();
        CreateMap<Hero, GetHeroDto>().ReverseMap();
        CreateMap<Hero, CreateHeroDto>().ReverseMap();

        CreateMap<Movie, MovieDto>().ReverseMap();
        CreateMap<Movie, GetMovieDto>().ReverseMap();
        CreateMap<Movie, CreateMovieDto>().ReverseMap();

        CreateMap<News, CreateNewsDto>().ReverseMap();
        CreateMap<News, UpdateNewsDto>()
            .ReverseMap()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Review, GetReviewDto>().ReverseMap();
        CreateMap<Review, CreateReviewDto>().ReverseMap();
        CreateMap<Review, UpdateReviewDto>().ReverseMap()
            .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember != null)); ;

        CreateMap<User, RegisterUserDto>().ReverseMap();
        CreateMap<User, UserDto>().ReverseMap();
    }
}

