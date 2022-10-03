using MarvelCU.Domain;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Movie;

public class GetMovieDto : BaseMovieDto
{
    [Range(1, 5)]
    public sbyte Rating { get; set; }

    public sbyte McuPhase { get; set; }

    public Sagas McuSaga { get; set; }

    public string Blob { get; set; }
}

