using MarvelCU.Common.Dtos.User;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MarvelCU.Dal.Interfaces;

public interface IAuthManager
{
    Task<IEnumerable<IdentityError>> Register(User user, string password);

    Task<User> Login(LoginUserDto loginUserDto);

    Task<IList<string>> GetUserRole(User user);

    Task<User> GetUserByEmail(string email);
}

