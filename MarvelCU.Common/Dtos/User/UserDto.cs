using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;
using MarvelCU.Domain;

namespace MarvelCU.Common.Dtos.User;

public class UserDto
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public  IList<string> Roles { get; set; }

    public virtual ICollection<MarvelCU.Domain.Review> Reviews { get; set; }

    public virtual ICollection<GetActorDto> FavouriteActors { get; set; }

    public virtual ICollection<GetMovieDto> FavouriteMovies { get; set; }

    public virtual ICollection<GetHeroDto> FavouriteHeroes { get; set; }

    public virtual ICollection<GetMovieDto> BoughtMovies { get; set; }
}

