using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Interfaces;

public interface ICurrentUser
{
    public string Id { get; }

    public string Email { get; }

    public string Jwt { get; }

    public IList<string> Roles { get; }
}

