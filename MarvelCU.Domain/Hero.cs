using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class Hero : BaseEntity
{

    [Required]
    public string Name { get; set; }

    public virtual ICollection<Actor> Actor { get; set; }

    public virtual ICollection<Movie> Movies { get; set; }
}

