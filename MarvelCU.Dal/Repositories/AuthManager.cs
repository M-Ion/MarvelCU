using MarvelCU.Common.Dtos.User;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MarvelCU.Dal.Repositories;

public class AuthManager : IAuthManager
{
    private readonly UserManager<User> _userManager;
    private readonly MarvelDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public AuthManager(
        UserManager<User> userManager,
        MarvelDbContext context,
        IConfiguration configuration
        )
    {
        _userManager = userManager;
        _context = context;
        _configuration = configuration;
        _tokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidIssuer = _configuration["JwtConfig:Issuer"],
            ValidAudience = _configuration["JwtConfig:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"])),
        };
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    public async Task<IList<string>> GetUserRole(User user)
    {
        return await _userManager.GetRolesAsync(user);
    }

    public async Task<User> Login(LoginUserDto loginUserDto)
    {
        var user = await _userManager.FindByEmailAsync(loginUserDto.Email);

        if (user is null) return null;

        bool valid = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);

        return user;
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

