using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Review;

public class CreateReviewDto
{
    [Required]
    [StringLength(100)]
    public string Opinion { get; init; }

    [Required]
    [Range(1, 5)]
    public int Rating { get; init; }
}

