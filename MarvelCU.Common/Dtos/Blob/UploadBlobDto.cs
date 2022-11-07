using Microsoft.AspNetCore.Http;

namespace MarvelCU.Common.Dtos.Blob;

public class UploadBlobDto : BaseBlobDto
{
    public IFormFile File { get; set; }
}

