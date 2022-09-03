using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Domain;

public record class Review
{
    public int Id { get; init; }

    public DateTime Posted { get; init; }

    public User Author { get; init; }

    [StringLength(100)]
    public string Opinion { get; init; }

    [Range(1, 5)]
    public int Rating { get; init; }
}

