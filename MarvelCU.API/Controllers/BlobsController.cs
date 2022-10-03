using MarvelCU.Bll.Interfaces;
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
        public async Task<ActionResult<IList<string>>> GetAllBlobs([FromQuery] string containerName)
        {
            if (containerName == null) return BadRequest();
            return Ok(await _cloudService.GetAllBlobs(containerName));
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<string>> GetBlob([FromQuery] string containerName, [FromRoute] string name)
        {
            if (containerName == null) return BadRequest();
            var blob = await _cloudService.GetBlob(name, containerName);

            if (blob is null) return NotFound();

            return Ok(blob);
        }
    }
}
