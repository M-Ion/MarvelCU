using MarvelCU.Common.Dtos.Actor;
using MarvelCU.Common.Dtos.Movie;

namespace MarvelCU.Common.Dtos.Hero;

public class HeroDto
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Blob { get; set; }

    public IList<GetActorDto> Actors { get; set; }

    public IList<GetMovieDto> Movies { get; set; }

}

