using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MarvelCU.Bll.Services;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public AuthService(IAuthRepository authRepository, IMapper mapper, IConfiguration configuration)
    {
        _authRepository = authRepository;
        _mapper = mapper;
        _configuration = configuration;
    }

    public Task<bool> Login(LoginUserDto loginUserDto)
    {
        return _authRepository.Login(loginUserDto);
    }

    public async Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto)
    {
        var user = _mapper.Map<User>(registerUserDto);
        user.UserName = registerUserDto.Email;

        return await _authRepository.Register(user, registerUserDto.Password);
    }

    private async Task<string> GenerateToken(User user)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtConfig:Key"]));

        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var roles = await _authRepository.GetUserRole(user);

        var roleClaims = roles.Select(r => new Claim(ClaimTypes.Role, r)).ToList();
        var userClaims = await _authRepository.GetUserClaims(user);

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
        }
        .Union(userClaims).Union(roleClaims);

        var token = new JwtSecurityToken(

            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

