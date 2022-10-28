using Microsoft.AspNetCore.Http;

namespace MarvelCU.Common.Dtos.Blob;

public class UploadBlobDto : GetBlobRequestDto
{
    public IFormFile File { get; set; }
}

