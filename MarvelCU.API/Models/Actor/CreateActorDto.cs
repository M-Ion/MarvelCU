using System.ComponentModel.DataAnnotations;

namespace MarvelCU.API.Models.Actor
{
    public class CreateActorDto
    {
        [Required]
        public string FullName { get; init; }
    }
}
