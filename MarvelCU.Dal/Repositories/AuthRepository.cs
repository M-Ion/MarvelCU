using MarvelCU.Common.Dtos.User;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MarvelCU.Dal.Repositories;

public class AuthRepository : IAuthRepository
{
    private readonly UserManager<User> _userManager;

    public AuthRepository(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<IList<Claim>> GetUserClaims(User user)
    {
        return await _userManager.GetClaimsAsync(user);
    }

    public async Task<IList<string>> GetUserRole(User user)
    {
        return await _userManager.GetRolesAsync(user);
    }

    public async Task<bool> Login(LoginUserDto loginUserDto)
    {
        var user = await _userManager.FindByEmailAsync(loginUserDto.Email);

        if (user is null) return false;

        bool valid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);

        return valid;
    }

    public async Task<IEnumerable<IdentityError>> Register(User user, string password)
    {
        var result = await _userManager.CreateAsync(user, password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "User");
        }

        return result.Errors;
    }
}

