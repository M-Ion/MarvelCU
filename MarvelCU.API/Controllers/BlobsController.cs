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
            return Ok(await _cloudService.GetAllBlobs(blobDto));
        }

        [HttpGet("Blob/{container}/{blobName}")]
        public async Task<ActionResult<GetBlobDto>> GetBlob([FromRoute] string container, [FromRoute] string blobName)
        {
            var blob = await _cloudService.GetBlob(new GetBlobRequestDto() { Container = container, Blob = blobName });

            if (blob is null) return NotFound();

            return Ok(blob);
        }

        [HttpPost("Download")]
        public async Task<ActionResult<Response>> DownloadBlob([FromBody] UploadBlobDto uploadBlobDto)
        {
            Response blob = await _cloudService.DownloadBlob(uploadBlobDto);

            if (blob is null) return NotFound();

            return Ok(blob);
        }
    }
}
