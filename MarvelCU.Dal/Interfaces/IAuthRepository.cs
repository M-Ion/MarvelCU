using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MarvelCU.Dal.Interfaces;

public interface IAuthRepository
{
    Task<IEnumerable<IdentityError>> Register(User user, string password);

    Task<bool> Login(LoginUserDto loginUserDto);

    Task<IList<string>> GetUserRole(User user);

    Task<IList<Claim>> GetUserClaims(User user);
}

