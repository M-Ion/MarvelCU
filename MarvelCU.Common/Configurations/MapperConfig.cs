using AutoMapper;
using MarvelCU.API.Models.Movie;
using MarvelCU.Common.Dtos;
using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Common.Dtos.News;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;
using System.Data;

namespace MarvelCU.Common.Configurations;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<Actor, ActorDto>().ReverseMap();
        CreateMap<Actor, GetActorDto>().ReverseMap();
        CreateMap<Actor, CreateActorDto>().ReverseMap();
        CreateMap<Actor, UpdateActorDto>()
            .ReverseMap()
            .ForAllMembers(opt => opt.Condition(IgnoreNullAndDefault));

        CreateMap<Hero, HeroDto>().ReverseMap();
        CreateMap<Hero, GetHeroDto>().ReverseMap();
        CreateMap<Hero, CreateHeroDto>().ReverseMap();
        CreateMap<Hero, UpdateHeroDto>()
            .ReverseMap()
            .ForAllMembers(opt => opt.Condition(IgnoreNullAndDefault));

        CreateMap<Movie, MovieDto>().ForMember(s => s.VideoBlob, opt => opt.MapFrom(
            reader => reader.VideoBlob != null
            ))
            .ReverseMap();

        CreateMap<Movie, GetMovieDto>().ReverseMap();
        CreateMap<Movie, CreateMovieDto>()
            .ReverseMap();

        CreateMap<Movie, UpdateMovieDto>()
            .ReverseMap()
            .ForAllMembers(opt => opt.Condition(IgnoreNullAndDefault));


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
        CreateMap<User, GetUserDto>().ReverseMap();

        CreateMap<RefreshToken, RefreshTokenDto>().ReverseMap();
    }

    private bool IgnoreNullAndDefault<TSrc, TDest>(TSrc src, TDest des, object srcMember, object destMember)
    {
        object srcDefaultValue = null;

        if (srcMember != null)
        {
            Type srcType = srcMember.GetType();

            if (srcType.IsValueType)
            {
                srcDefaultValue = Activator.CreateInstance(srcType);
            }
        }

        bool srcHasNoValue = Object.Equals(srcMember, srcDefaultValue);

        return !srcHasNoValue;
    }
}

