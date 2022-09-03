using MarvelCU.API.Models.Movie;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.API.Models.Actor
{
    public class UpdateActorDto
    {
        [Required]
        public int Id { get; init; }
        [Required]
        public List<GetMovieDto> Movies { get; set; }
    }
}
