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

    public ReviewsController(IReviewService reviewService, IAuthService authService)
    {
        _reviewService = reviewService;
    }

    [HttpPost("{id}")]
    [Authorize]
    public async Task<ActionResult<Review>> PostReview(int id, [FromBody] CreateReviewDto createReviewDto)
    {
        var review = await _reviewService.CreateReview(id, createReviewDto);
        return review is null ? BadRequest() : NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult> UpdateReview(int id, [FromBody] UpdateReviewDto updateReviewDto)
    {
        var review = await _reviewService.UpdateReview(updateReviewDto, id);
        return review is null ? NotFound() : NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult> DeleteReview(int id)
    {
        bool deleted = await _reviewService.DeleteReview(id);
        return deleted ? NoContent() : NotFound();
    }
}

