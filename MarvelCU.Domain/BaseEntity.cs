using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Domain;

public class BaseEntity
{
    [Key]
    public int Id { get; set; }
}

