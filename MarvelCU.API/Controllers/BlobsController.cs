using Azure;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.Blob;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlobsController : ControllerBase
    {
        private readonly ICloudStorageService _cloudService;

        public BlobsController(ICloudStorageService cloudService)
        {
            _cloudService = cloudService;
        }

        [HttpGet]
        public async Task<ActionResult<IList<GetBlobDto>>> GetAllBlobs([FromBody] BaseBlobDto blobDto)
        {
            var blobs = await _cloudService.GetAllBlobs(blobDto);
            return Ok(blobs);
        }

        [HttpGet("Blob/{container}/{blobName}")]
        public async Task<ActionResult<GetBlobDto>> GetBlob([FromRoute] string container, [FromRoute] string blobName)
        {
            var blob = await _cloudService.GetBlob(new GetBlobRequestDto() { Container = container, Blob = blobName });

            if (blob is null)
            {
                return NotFound();
            }

            return Ok(blob);
        }

        [HttpPost("Upload/{container}/{blobName}")]
        public async Task<ActionResult> UploadBlob([FromForm] IFormFile file, [FromRoute] string container, [FromRoute] string blobName)
        {

            bool uploaded = await _cloudService.UploadBlob(new UploadBlobDto() { Container = container, Blob = blobName, File = file });

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

            stream.Position = 0;
            return File(stream, "video/mp4", blobName);
        }
    }
}
