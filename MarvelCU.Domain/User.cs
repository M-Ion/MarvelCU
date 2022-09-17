using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Domain;

public class User : IdentityUser
{
    public virtual ICollection<Review> Reviews { get; set; }

    public virtual ICollection<Actor> FavouriteActors { get; set; }

    public virtual ICollection<Movie> FavouriteMovies { get; set; }

    public virtual ICollection<Hero> FavouriteHeroes { get; set; }
}

