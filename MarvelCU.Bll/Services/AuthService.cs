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

    public AuthService(
        IAuthRepository authRepository, 
        ITokenRepository tokenRepository,
        IMapper mapper
        )
    {
        _authRepository = authRepository;
        _tokenRepository = tokenRepository;
        _mapper = mapper;
    }

    public async Task<AuthResponseDto> Login(LoginUserDto loginUserDto)
    {
        User user = await _authRepository.Login(loginUserDto);

        if (user is null) return null;

        return await _tokenRepository.GenerateTokens(user);
    }

    public async Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto)
    {
        return await _tokenRepository.RefreshToken(tokenRequestDto);
    }

    public async Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto)
    {
        var user = _mapper.Map<User>(registerUserDto);
        user.UserName = registerUserDto.Email;

        return await _authRepository.Register(user, registerUserDto.Password);
    }
}

