using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.Blob;

public class BaseBlobDto
{
    [Required]
    public string Container { get; set; }
}

