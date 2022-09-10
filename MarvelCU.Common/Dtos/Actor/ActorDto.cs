using MarvelCU.Common.Dtos.Movie;

namespace MarvelCU.Common.Dtos.Actor;

public class ActorDto
{
    public int Id { get; init; }

    public string FirstName { get; set; }

    public string MiddleName { get; set; }

    public string LastName { get; set; }

    public byte[] Image { get; set; }

    public IList<MovieDto> Movies { get; set; }
}

