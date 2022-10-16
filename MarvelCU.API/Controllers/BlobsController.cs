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
        public async Task<ActionResult<IList<string>>> GetAllBlobs([FromBody] BaseBlobDto blobDto)
        {
            return Ok(await _cloudService.GetAllBlobs(blobDto));
        }

        [HttpGet("Blob")]
        public async Task<ActionResult<string>> GetBlob([FromBody] GetBlobRequestDto requestBlobDto)
        {
            var blob = await _cloudService.GetBlob(requestBlobDto);

            if (blob is null) return NotFound();

            return Ok(blob);
        }

        [HttpGet("Download")]
        public async Task<ActionResult<Response>> DownloadBlob([FromBody] UploadBlobDto uploadBlobDto)
        {
            Response blob = await _cloudService.DownloadBlob(uploadBlobDto);

            if (blob is null) return NotFound();

            return Ok(blob);
        }
    }
}
