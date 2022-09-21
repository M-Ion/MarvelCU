using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class BaseUserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}

