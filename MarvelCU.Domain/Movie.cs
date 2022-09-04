using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Domain;

public class Movie
{
    public int Id { get; set; }

    public string Name { get; set; }

    public StringBuilder Descritpion { get; set; }

    public DateTime Premiere { get; set; }

    List<Actor> Actors { get; set; }

    [Range(1, 5)]
    public sbyte Rating { get; set; }

    public sbyte McuPhase { get; set; }

    public Sagas McuSaga { get; set; }

    public List<Review> Reviews { get; set; }
}

