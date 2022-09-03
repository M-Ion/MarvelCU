using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.API.Data
{
    public class Movie
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public StringBuilder Descritpion { get; set; }
        public DateTime Premiere { get; init; }
        List<Actor> Actors { get; set; }

        [Range(1, 5)]
        public sbyte Rating { get; set; }
        public sbyte McuPhase { get; init; }
        public Sagas McuSaga { get; init; }
        public List<Review> Reviews { get; set; }
    }
}
