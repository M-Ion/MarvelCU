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

public class TokenRepository : GenericRepository<RefreshToken>, ITokenRepository
{
    private readonly MarvelDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public TokenRepository(
        MarvelDbContext context, 
        UserManager<User> userManager, 
        IConfiguration configuration,
        TokenValidationParameters tokenValidationParameters
        ) : base(context)
    {
        _context = context;
        _userManager = userManager;
        _configuration = configuration;
        _tokenValidationParameters = tokenValidationParameters;
    }

    public async Task<AuthResponseDto> GenerateTokens(User user)
    {
        var token = await GenerateToken(user);
        var refreshToken = await GenerateRefreshToken(user, token);

        return new AuthResponseDto() 
        { 
            UserId = user.Id, 
            Token = new JwtSecurityTokenHandler().WriteToken(token), 
            RefreshToken = refreshToken 
        };
    }

    private async Task<JwtSecurityToken> GenerateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var roles = await _userManager.GetRolesAsync(user);

        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
        var userClaims = await _userManager.GetClaimsAsync(user);

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
        }
        .Union(userClaims).Union(roleClaims);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtConfig:Issuer"],
            audience: _configuration["JwtConfig:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(Convert.ToInt32(_configuration["JwtConfig:DurationInMinutes"])),
            signingCredentials: credentials
            );

        return token;
    }

    private async Task<string> GenerateRefreshToken(User user, JwtSecurityToken token)
    {
        RefreshToken refreshToken = new()
        {
            JwtId = token.Id,
            Token = await _userManager.GenerateUserTokenAsync(user, "MarvelCUAPI", "RefreshToken"),
            Expired = DateTime.Now.AddMonths(1),
            UserId = user.Id
        };

        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();

        return refreshToken.Token;
    }
}

