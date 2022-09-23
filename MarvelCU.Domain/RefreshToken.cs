using System.ComponentModel.DataAnnotations.Schema;

namespace MarvelCU.Domain;

public class RefreshToken : BaseEntity
{
    public string UserId { get; set; }

    public string Token { get; set; }

    public string JwtId { get; set; }

    public bool IsUsed { get; set; } = false;

    public bool IsRevoked { get; set; } = false;

    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime Expired { get; set; }
}

