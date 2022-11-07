using Azure;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Blob;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace MarvelCU.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly ICloudStorageService _cloudService;
        private readonly IMovieService _movieService;
        private readonly IHeroService _heroService;
        private readonly IActorService _actorService;

        public BlobsController(
            ICloudStorageService cloudService, 
            IMovieService movieService, 
            IHeroService heroService, 
            IActorService actorService
            )
        {
            _cloudService = cloudService;
            _movieService = movieService;
            _heroService = heroService;
            _actorService = actorService;
        }

        [HttpPost("Movie")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UploadMovieBlob([FromForm] IFormFile file)
        {
            bool uploaded = await _cloudService.UploadBlob(
                new UploadBlobDto() { Container = "movie-images", File = file },
                _movieService.SetBlob
                );

            if (uploaded)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("Hero")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UploadHeroBlob([FromForm] IFormFile file)
        {
            bool uploaded = await _cloudService.UploadBlob(
                new UploadBlobDto() { Container = "hero-images", File = file },
                _heroService.SetBlob
                );

            if (uploaded)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpPost("Actor")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UploadActorBlob([FromForm] IFormFile file)
        {
            bool uploaded = await _cloudService.UploadBlob(
                new UploadBlobDto() { Container = "actor-images", File = file },
                _actorService.SetBlob
                );

            if (uploaded)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet("Download/{container}/{blobName}")]
        public async Task<ActionResult> DownloadBlob([FromRoute] string container, [FromRoute] string blobName)
        {
            MemoryStream stream = await _cloudService.DownloadBlob(new GetBlobRequestDto() { Container = container, Blob = blobName });
            if (stream is null)
            {
                return NotFound();
            }

            return File(stream, "video/mp4", blobName);
        }
    }
}
