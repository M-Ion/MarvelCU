using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class Review : BaseEntity
{
    [Required]
    public DateTime Posted { get; set; }

    public DateTime Updated { get; set; }

    [Required]
    public User User { get; set; }

    [Required]
    public Movie Movie { get; set; }

    [Required]
    [StringLength(100)]
    public string Opinion { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }
}

