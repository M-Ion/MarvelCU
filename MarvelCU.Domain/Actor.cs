using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class Actor : BaseEntity
{
    [Required]
    [MaxLength(25)]
    public string FirstName { get; set; }

    [MaxLength(25)]
    public string MiddleName { get; set; }

    [MaxLength(25)]
    public string LastName { get; set; }

    [Column(TypeName = "image")]
    public byte[] Image { get; set; }

    public ICollection<Movie> Movies { get; set; }
}

