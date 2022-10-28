using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class BaseUserDto
{
    [Required]
    public string Password { get; set; }
}

