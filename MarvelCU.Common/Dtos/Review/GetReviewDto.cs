using MarvelCU.Common.Dtos.User;

namespace MarvelCU.Common.Dtos.Review;

public class GetReviewDto
{
    public string Opinion { get; set; }

    public int Rating { get; set; }

    public UserDto User { get; set; }
}

