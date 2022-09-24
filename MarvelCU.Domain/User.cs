using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Domain;

public class User : IdentityUser
{
    [Required]
    public string FirstName { get; set;}

    [Required]
    public string LastName { get; set;} 

    public string CustomerId { get; set; }

    public virtual ICollection<Review> Reviews { get; set; }

    public virtual ICollection<Actor> FavouriteActors { get; set; }

    public virtual ICollection<Movie> FavouriteMovies { get; set; }

    public virtual ICollection<Hero> FavouriteHeroes { get; set; }
}

