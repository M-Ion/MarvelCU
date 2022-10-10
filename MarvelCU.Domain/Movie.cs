using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MarvelCU.Domain;

public class Movie : BaseEntity
{
    private ICollection<User> _users;

    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    public string Descritpion { get; set; }

    [Column(TypeName = "date")]
    public DateTime Premiere { get; set; }

    public virtual ICollection<Actor> Actors { get; set; }

    [Range(1, 5)]
    public sbyte? Rating { get; set; }

    [Required]
    public sbyte McuPhase { get; set; }

    [Required]
    public sbyte McuSaga { get; set; }

    public virtual ICollection<Review> Reviews { get; set; }

    public virtual ICollection<Hero> Heroes { get; set; }

    [BackingField(nameof(_users))]
    public virtual ICollection<User> Users
    {
        get { return _users; }
        private set { _users = value; }
    }
}

