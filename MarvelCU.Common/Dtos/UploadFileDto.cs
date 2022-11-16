using MarvelCU.Common.Attributes;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Common.Dtos
{
    public class UploadFileDto
    {
        [AllowedFileExtensions(new string[] { ".mp4" })]
        public IFormFile File { get; set; }
    }
}
