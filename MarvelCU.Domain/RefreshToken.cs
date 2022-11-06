using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class RefreshToken : BaseEntity
{
    [Required]
    public string UserId { get; set; }

    [Required]
    public string Token { get; set; }

    [Required]
    public string JwtId { get; set; }

    public bool IsUsed { get; set; } = false;

    public bool IsRevoked { get; set; } = false;

    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    public DateTime Expired { get; set; }
}

