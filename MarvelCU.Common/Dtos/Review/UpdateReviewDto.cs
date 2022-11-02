using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Review;

public class UpdateReviewDto
{
    [Required]
    public string Opinion { get; set; }

    [Required]
    [Range(1, 5)]
    public int Rating { get; set; }
}

