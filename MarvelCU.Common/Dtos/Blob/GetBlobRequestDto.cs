
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Blob;

public class GetBlobRequestDto : BaseBlobDto
{
    [Required]
    public string Blob { get; set; }
}

