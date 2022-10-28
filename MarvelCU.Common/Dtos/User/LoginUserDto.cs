using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class LoginUserDto : BaseUserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}

