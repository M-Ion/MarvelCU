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
    private readonly IAuthManager _authRepository;
    private readonly ITokenManager _tokenManager;
    private readonly IMapper _mapper;

    public AuthService(
        IAuthManager authRepository, 
        ITokenManager tokenManager,
        IMapper mapper
        )
    {
        _authRepository = authRepository;
        _tokenManager = tokenManager;
        _mapper = mapper;
    }

    public async Task<User> GetUserByEmail(string email)
    {
        return await _authRepository.GetUserByEmail(email);
    }

    public async Task<AuthResponseDto> Login(LoginUserDto loginUserDto)
    {
        User user = await _authRepository.Login(loginUserDto);

        if (user is null) return null;

        // Verify if refresh token already exists and remove it
        var refreshToken = await _tokenManager.GetRefreshTokenByUser(user);
        if (refreshToken is not null) await _tokenManager.RevokeRefreshToken(refreshToken);

        return await _tokenManager.GenerateTokens(user);
    }

    public async Task<AuthResponseDto> RefreshToken(TokenRequestDto tokenRequestDto)
    {
        return await _tokenManager.RefreshToken(tokenRequestDto);
    }

    public async Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto)
    {
        var user = _mapper.Map<User>(registerUserDto);
        user.UserName = registerUserDto.Email;

        return await _authRepository.Register(user, registerUserDto.Password);
    }
}

