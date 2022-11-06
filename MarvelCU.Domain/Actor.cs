using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class Actor : BaseEntity
{
    private ICollection<User> _users;

    [Required]
    [MaxLength(50)]
    public string FirstName { get; set; }

    [MaxLength(50)]
    public string MiddleName { get; set; }

    [MaxLength(50)]
    public string LastName { get; set; }

    public virtual ICollection<Hero> Heroes { get; set; }

    public virtual ICollection<Movie> Movies { get; set; }

    [BackingField(nameof(_users))]
    public virtual ICollection<User> Users
    {
        get { return _users; }
        private set { _users = value; }
    }
}

