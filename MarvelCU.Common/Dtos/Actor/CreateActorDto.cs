using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Actor;

public class CreateActorDto
{
    [Required]
    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public string BlobFilePath { get; set; }
}

