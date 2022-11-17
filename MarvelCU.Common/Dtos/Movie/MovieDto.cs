using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Domain;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MarvelCU.Common.Dtos.Movie;

public class MovieDto : BaseMovieDto
{
    public int Id { get; set; }

    public string Description { get; set; }

    public float Price { get; set; }

    [Range(1, 5)]
    public sbyte Rating { get; set; }

    public sbyte McuPhase { get; set; }

    public Sagas McuSaga { get; set; }

    public string YouTubeTrailerId { get; set; }

    public string Blob { get; set; }

    public bool VideoBlob { get; set; }

    public string ImdbId { get; set; }

    public List<GetActorDto> Actors { get; set; }

    public List<GetHeroDto> Heroes { get; set; }

    public List<GetReviewDto> Reviews { get; set; }
}

