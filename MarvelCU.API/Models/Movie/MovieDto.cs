using MarvelCU.API.Data;
using MarvelCU.API.Models.Actor;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Models.Movie
{
    public class MovieDto : BaseMovieDto
    {
        public int Id { get; set; }
        public StringBuilder Descritpion { get; set; }

        [Range(1, 5)]
        public sbyte Rating { get; set; }
        public sbyte McuPhase { get; set; }
        public Sagas McuSaga { get; set; }
        List<GetActorDto> Actors { get; set; }
    }
}
