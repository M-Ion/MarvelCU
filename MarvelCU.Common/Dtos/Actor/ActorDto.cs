using MarvelCU.Common.Dtos.Hero;
using MarvelCU.Common.Dtos.Movie;

namespace MarvelCU.Common.Dtos.Actor;

public class ActorDto
{
    public int Id { get; init; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public string Blob { get; set; }

    public string ImdbId { get; set; }

    public string Name
    {
        get
        {
            return FirstName
                + (MiddleName != null ? $" {MiddleName}" : "")
                + (LastName != null ? $" {LastName}" : "");
        }
    }

    public IList<GetMovieDto> Movies { get; set; }

    public IList<GetHeroDto> Heroes { get; set; }
}

