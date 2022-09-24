using MarvelCU.Common.Dtos.User;
using MarvelCU.Common.Exceptions;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MarvelCU.Dal.Repositories;

public class TokenManager : ITokenManager
{
    private readonly MarvelDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public TokenManager(
        MarvelDbContext context,
        UserManager<User> userManager,
        IConfiguration configuration,
        TokenValidationParameters tokenValidationParameters
        )
    {
        _context = context;
        _userManager = userManager;
        _configuration = configuration;
        _tokenValidationParameters = tokenValidationParameters;
    }

    // Generate Jwt and refresh token and store refresh token to db
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

    // Generate Jwt
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
            expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_configuration["JwtConfig:DurationInMinutes"])),
            signingCredentials: credentials
            );

        return token;
    }

    // Generate refresh token and store it to db
    private async Task<string> GenerateRefreshToken(User user, JwtSecurityToken token)
    {
        RefreshToken refreshToken = new()
        {
            JwtId = token.Id,
            Token = await _userManager.GenerateUserTokenAsync(user, "MarvelCUAPI", "RefreshToken"),
            Expired = DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])),
            UserId = user.Id
        };

        await _context.RefreshTokens.AddAsync(refreshToken);
        await _context.SaveChangesAsync();

        return refreshToken.Token;
    }

    // Refresh the Jwt and generate another refresh token
    public async Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto)
    {
        ClaimsPrincipal tokenVerification;
        SecurityToken validatedToken;

        try
        {
            // Validate jwt
            _tokenValidationParameters.ValidateLifetime = false;

            tokenVerification = new JwtSecurityTokenHandler()
                .ValidateToken(tokenRequestDto.Token, _tokenValidationParameters, out validatedToken);
        }
        catch (Exception e)
        {
            throw new InvalidJwtException(e.Message);
        }
        finally
        {
            _tokenValidationParameters.ValidateLifetime = true;
        }

        if (!ValidateJwt(tokenVerification, validatedToken)) throw new InvalidJwtException("Invalid jwt!");

        var storedRefreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == tokenRequestDto.RefreshToken);

        if (!await ValidateRefreshToken(storedRefreshToken, tokenVerification)) throw new InvalidRefreshTokenException("Invalid refresh token!");

        var user = await _userManager.FindByIdAsync(storedRefreshToken.UserId);

        _tokenValidationParameters.ValidateLifetime = true;

        var token = await GenerateToken(user);
        storedRefreshToken.Token = await _userManager.GenerateUserTokenAsync(user, "MarvelCUAPI", "RefreshToken");
        storedRefreshToken.JwtId = token.Id;

        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            UserId = user.Id,
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            RefreshToken = storedRefreshToken.Token
        };
    }

    // Remove refresh token from db
    public async Task RevokeRefreshToken(RefreshToken refreshToken)
    {
        _context.Set<RefreshToken>().Remove(refreshToken);
        await _context.SaveChangesAsync();
    }

    private bool ValidateJwt(ClaimsPrincipal tokenVerification, SecurityToken validatedToken)
    {
        if (validatedToken is JwtSecurityToken jwtSecurity)
        {
            if (!jwtSecurity.Header.Alg.Equals(SecurityAlgorithms.HmacSha256)) return false;
        }

        long expiryDate = long.Parse(tokenVerification.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp).Value);

        // Verify jwt expiry time
        if (expiryDate > ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeSeconds())
        {
            return false;
        }

        return true;
    }

    private async Task<bool> ValidateRefreshToken(RefreshToken storedRefreshToken, ClaimsPrincipal jwt)
    {
        if (storedRefreshToken is null) return false;

        var jti = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti).Value;

        if (storedRefreshToken.JwtId != jti) return false;

        if (storedRefreshToken.Expired < DateTime.UtcNow)
        {
            await RevokeRefreshToken(storedRefreshToken);
            return false;
        }

        return true;
    }

    public async Task<RefreshToken> GetRefreshTokenByUser(User user)
    {
        return await _context.RefreshTokens.FirstOrDefaultAsync(t => t.UserId == user.Id);
    }
}

