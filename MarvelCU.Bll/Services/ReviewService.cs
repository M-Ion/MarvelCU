using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Bll.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly IMapper _mapper;

    public ReviewService(
        IReviewRepository reviewRepository, 
        IMovieRepository movieRepository,
        IMapper mapper)
    {
        _reviewRepository = reviewRepository;
        _movieRepository = movieRepository;
        _mapper = mapper;
    }

    public async Task<Review> CreateReview(int movieId, CreateReviewDto createReviewDto)
    {
        var review = _mapper.Map<Review>(createReviewDto);
        var movie = await _movieRepository.Exists(movieId);

        review.Movie = movie;
        review.UserId = review.User.Id;

        return await _reviewRepository.AddAsync(review);
    }

    public async Task DeleteReview(int id)
    {
        var review = await _reviewRepository.Exists(id);
        await _reviewRepository.RemoveAsync(review);
    }

    public async Task UpdateReview(UpdateReviewDto updateReviewDto, int id)
    {
        var review = await _reviewRepository.Exists(id);
        _mapper.Map(updateReviewDto, review);

        await _reviewRepository.UpdateAsync(review);
    }

    public bool ExistsUserReview(int reviewId, User user)
    {
        return user.Reviews.FirstOrDefault(r => r.Id == reviewId) is null ? false : true;
    }

    public bool ExistsMovieUserReview(int movieId, User user)
    {
        return user.Reviews.FirstOrDefault(r => r.Movie.Id == movieId) is null ? false : true;
    }
}

