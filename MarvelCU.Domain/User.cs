using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Domain;

public class User : IdentityUser
{
    public int Id { get; init; }
}

