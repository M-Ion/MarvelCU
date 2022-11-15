using MarvelCU.Common.Dtos.Review;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Interfaces;

public interface IReviewService
{
    Task<Review> CreateReview(int movieId, CreateReviewDto createReviewDto);

    Task<bool> DeleteReview(int id);

    Task<GetReviewDto> UpdateReview(UpdateReviewDto updateReviewDto, int id);
}

