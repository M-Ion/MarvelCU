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

    [HttpPost("{movieId}")]
    [Authorize]
    public async Task<ActionResult<Review>> PostReview(int movieId, [FromBody] CreateReviewDto createReviewDto)
    {
        var user = await _authService.GetUserFromContext(HttpContext);

        if (user is null) return Unauthorized();

        // Verify if current user already posted review for movie
        if (_reviewService.ExistsMovieUserReview(movieId, user)) return BadRequest();

        createReviewDto.User = user;

        return Ok(await _reviewService.CreateReview(movieId, createReviewDto));
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteReview(int id)
    {
        var user = await _authService.GetUserFromContext(HttpContext);
        if (user is null) return Unauthorized();

        if (!_reviewService.ExistsUserReview(id, user)) return Unauthorized();

        await _reviewService.DeleteReview(id);
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateReview(int id, [FromBody] UpdateReviewDto updateReviewDto)
    {
        var user = await _authService.GetUserFromContext(HttpContext);
        if (user is null) return Unauthorized();

        if (!_reviewService.ExistsUserReview(id, user)) return Unauthorized();

        await _reviewService.UpdateReview(updateReviewDto, id);
        return Ok();
    }
}

