using MarvelCU.Domain;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Movie;

public class GetMovieDto : BaseMovieDto
{
    public int Id { get; set; }

    [Range(0, 5)]
    public float Rating { get; set; }

    public sbyte McuPhase { get; set; }

    public Sagas McuSaga { get; set; }

    public string Blob { get; set; }

    public string ImdbId { get; set; }
}

