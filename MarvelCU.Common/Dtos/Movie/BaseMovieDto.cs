using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Movie;

public class BaseMovieDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public DateTime Premiere { get; set; }
}

