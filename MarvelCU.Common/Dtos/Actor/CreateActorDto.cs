using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Actor;

public class CreateActorDto
{
    [Required]
    public string FullName { get; init; }
}

