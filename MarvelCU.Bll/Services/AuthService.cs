using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Bll.Services;

public class AuthService : IAuthService
{
    private readonly IAuthManager _authManager;
    private readonly ITokenManager _tokenManager;
    private readonly ICurrentCookies _currentCookies;
    private readonly IMapper _mapper;

    public AuthService(
        IAuthManager authManager, 
        ITokenManager tokenManager,
        ICurrentCookies currentCookies,
        IMapper mapper
        )
    {
        _authManager = authManager;
        _tokenManager = tokenManager;
        _currentCookies = currentCookies;
        _mapper = mapper;
    }

    public async Task<IEnumerable<IdentityError>> Register(RegisterUserDto registerUserDto)
    {
        var user = _mapper.Map<User>(registerUserDto);
        user.UserName = registerUserDto.Email;

        return await _authManager.Register(user, registerUserDto.Password);
    }

    public async Task<AuthResponseDto> Login(LoginUserDto loginUserDto)
    {
        User user = await _authManager.Login(loginUserDto);

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

    public TokenRequestDto GetAuthCookies()
    {
        return new TokenRequestDto()
        {
            Token = _currentCookies.Jwt,
            RefreshToken = _currentCookies.RefreshToken,
        };
    }

}

