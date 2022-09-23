using System.ComponentModel.DataAnnotations;

namespace MarvelCU.Common.Dtos.User;

public class TokenRequestDto
{
    [Required]
    public string Token { get; set; }

    [Required]
    public string RefreshToken { get; set; }
}

