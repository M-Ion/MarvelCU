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
    private readonly ITokenRepository _tokenRepository;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public AuthService(
        IAuthRepository authRepository, 
        ITokenRepository tokenRepository,
        IMapper mapper, 
        IConfiguration configuration)
    {
        _authRepository = authRepository;
        _tokenRepository = tokenRepository;
        _mapper = mapper;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> Login(LoginUserDto loginUserDto)
    {
        User user = await _authRepository.Login(loginUserDto);

        if (user is null) return null;

        return await _tokenRepository.GenerateTokens(user);
    }

    public async Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto)
    {
        var user = _mapper.Map<User>(registerUserDto);
        user.UserName = registerUserDto.Email;

        return await _authRepository.Register(user, registerUserDto.Password);
    }
}

