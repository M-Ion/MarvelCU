using MarvelCU.Common.Dtos.User;

namespace MarvelCU.Common.Dtos.Review;

public class GetReviewDto
{
    public int Id { get; set; }

    public string Opinion { get; set; }

    public int Rating { get; set; }

    public GetUserDto User { get; set; }
}

