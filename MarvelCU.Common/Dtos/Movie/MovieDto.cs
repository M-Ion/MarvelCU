using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Domain;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Common.Dtos.Movie;

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

