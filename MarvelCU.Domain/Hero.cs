using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class Hero : BaseEntity
{
    private ICollection<User> _users;

    [Required]
    [MaxLength(150)]
    public string Name { get; set; }

    [MaxLength(600)]
    public string Description { get; set; }

    public virtual ICollection<Actor> Actors { get; set; }

    public virtual ICollection<Movie> Movies { get; set; }

    [BackingField(nameof(_users))]
    public virtual ICollection<User> Users
    {
        get { return _users; }
        private set { _users = value; }
    }
}

