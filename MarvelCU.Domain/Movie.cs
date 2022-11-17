using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MarvelCU.Domain;

public class Movie : BaseEntity
{
    private ICollection<User> _users;

    private ICollection<User> _customers;

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(600)]
    public string Description { get; set; }

    [Column(TypeName = "date")]
    public DateTime Premiere { get; set; }

    [Required]
    public uint Price { get; set; } = 0;

    [Range(1, 5)]
    public float Rating { get; set; } = 0;

    [Required]
    public sbyte McuPhase { get; set; }

    [Required]
    public sbyte McuSaga { get; set; }

    public string Blob { get; set; }

    public string VideoBlob { get; set; }

    [MaxLength(150)]
    public string YouTubeTrailerId { get; set; }

    [MaxLength(20)]
    public string ImdbId { get; set; }

    public virtual IList<Actor> Actors { get; set; }

    public virtual ICollection<Review> Reviews { get; set; }

    public virtual ICollection<Hero> Heroes { get; set; }

    [BackingField(nameof(_users))]
    public virtual ICollection<User> Users
    {
        get { return _users; }
        private set { _users = value; }
    }

    [BackingField(nameof(_customers))]
    public virtual ICollection<User> Customers
    {
        get { return _customers; }
        private set { _customers = value; }
    }
}

