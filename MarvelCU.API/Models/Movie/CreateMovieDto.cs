using MarvelCU.API.Data;
using MarvelCU.API.Models.Actor;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Models.Movie
{
    public class CreateMovieDto : BaseMovieDto
    {
        [Required]
        public StringBuilder Descritpion { get; set; }
        [Required]
        public sbyte McuPhase { get; set; }
        [Required]
        public Sagas McuSaga { get; set; }
        List<GetActorDto> Actors { get; set; }
    }
}
