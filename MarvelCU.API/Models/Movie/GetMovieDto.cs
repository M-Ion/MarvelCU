using MarvelCU.API.Data;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Models.Movie
{
    public class GetMovieDto : BaseMovieDto
    {
        [Range(1, 5)]
        public sbyte Rating { get; set; }
        public sbyte McuPhase { get; set; }
        public Sagas McuSaga { get; set; }
    }
}
