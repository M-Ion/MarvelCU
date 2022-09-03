using MarvelCU.API.Data;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.API.Models.Review
{
    public class CreateReviewDto
    {
        [Required]
        public User Author { get; set; }

        [Required]
        [StringLength(100)]
        public string Opinion { get; init; }

        [Required]
        [Range(1, 5)]
        public int Rating { get; init; }
    }
}
