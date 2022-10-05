using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly UserManager<User> _userManager;
    private readonly ICurrentUser _currentUser;
    private readonly IMapper _mapper;

    public ReviewService(
        IReviewRepository reviewRepository, 
        IMovieRepository movieRepository,
        UserManager<User> userManager,
        ICurrentUser currentUser,
        IMapper mapper)
    {
        _reviewRepository = reviewRepository;
        _movieRepository = movieRepository;
        _currentUser = currentUser;
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task<Review> CreateReview(int movieId, CreateReviewDto createReviewDto)
    {
        var review = _mapper.Map<Review>(createReviewDto);
        var movie = await _movieRepository.Exists(movieId);

        if (await ExistsMovieReview(movie)) return null;
   
        review.Movie = movie;
        review.UserId = _currentUser.Id;

        return await _reviewRepository.AddAsync(review);
    }

    public async Task<Review> UpdateReview(UpdateReviewDto updateReviewDto, int id)
    {
        var review = await _reviewRepository.Exists(id);

        if (!await BelongsReview(review)) return null;

        _mapper.Map(updateReviewDto, review);

        await _reviewRepository.UpdateAsync(review);

        return review;
    }

    public async Task<bool> DeleteReview(int id)
    {
        var review = await _reviewRepository.Exists(id);

        if (!await BelongsReview(review)) return false;

        await _reviewRepository.RemoveAsync(review);

        return true;
    }

    // Verify if review belongs to current user
    private async Task<bool> BelongsReview(Review review)
    {
        var user = await _userManager.FindByIdAsync(_currentUser.Id);
        return user.Reviews.Contains(review);
    }

    // Verify if user already posted review on movie
    private async Task<bool> ExistsMovieReview(Movie movie)
    {
        var user = await _userManager.FindByIdAsync(_currentUser.Id);
        var exists = user.Reviews.FirstOrDefault(review => review.Movie == movie);

        return exists is null ? false : true;
    }
}

