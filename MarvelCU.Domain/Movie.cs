using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace MarvelCU.Domain;

public class Movie : BaseEntity
{
    [Required]
    [MaxLength(50)]
    public string Name { get; set; }

    public string Descritpion { get; set; }

    public DateTime Premiere { get; set; }

    [Column(TypeName = "image")]
    public byte[] Image { get; set; }

    public ICollection<Actor> Actors { get; set; }

    [Range(1, 5)]
    public sbyte Rating { get; set; }

    [Required]
    public sbyte McuPhase { get; set; }

    [Required]
    public Sagas McuSaga { get; set; }

    public ICollection<Review> Reviews { get; set; }
}

