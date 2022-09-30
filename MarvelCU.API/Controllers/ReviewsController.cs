using MarvelCU.API.Infrastructure.Filters;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Review;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController : ControllerBase
{
    private readonly IReviewService _reviewService;
    private readonly IAuthService _authService;
    private readonly IMovieService _movieService;

    public ReviewsController(IReviewService reviewService, IAuthService authService, IMovieService movieService)
    {
        _reviewService = reviewService;
        _authService = authService;
        _movieService = movieService;
    }

    // id - Movie Id
    [HttpPost("{id}")]
    [Authorize]
    [ServiceFilter(typeof(EntityIdValidationFilter<Movie>))]
    [ServiceFilter(typeof(CurrentUserValidationFilter))]
    [ServiceFilter(typeof(UserReviewValidationFiler))]
    public async Task<ActionResult<Review>> PostReview(int id, [FromBody] CreateReviewDto createReviewDto)
    {
        var user = HttpContext.Items["CurrentUser"] as User;
        createReviewDto.User = user;

        return Ok(await _reviewService.CreateReview(id, createReviewDto));
    }

    // id - Review Id
    [HttpPut("{id}")]
    [Authorize]
    [ServiceFilter(typeof(EntityIdValidationFilter<Review>))]
    [ServiceFilter(typeof(CurrentUserValidationFilter))]
    public async Task<ActionResult> UpdateReview(int id, [FromBody] UpdateReviewDto updateReviewDto)
    {
        var user = HttpContext.Items["CurrentUser"] as User;

        await _reviewService.UpdateReview(updateReviewDto, id);
        return Ok();
    }

    // id - Review Id
    [HttpDelete("{id}")]
    [Authorize]
    [ServiceFilter(typeof(EntityIdValidationFilter<Review>))]
    [ServiceFilter(typeof(CurrentUserValidationFilter))]
    [ServiceFilter(typeof(UserReviewValidationFiler))]
    public async Task<ActionResult> DeleteReview(int id)
    {
        await _reviewService.DeleteReview(id);
        return Ok();
    }
}

