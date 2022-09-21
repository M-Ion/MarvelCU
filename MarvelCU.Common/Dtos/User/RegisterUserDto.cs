using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class RegisterUserDto : BaseUserDto
{
    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }
}

