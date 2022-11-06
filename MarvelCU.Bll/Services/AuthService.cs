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
    private readonly ICurrentUser _currentUser;
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public AuthService(
        IAuthManager authManager,
        ITokenManager tokenManager,
        ICurrentCookies currentCookies,
        ICurrentUser currentUser,
        UserManager<User> userManager,
        IMapper mapper
        )
    {
        _authManager = authManager;
        _tokenManager = tokenManager;
        _currentCookies = currentCookies;
        _currentUser = currentUser;
        _userManager = userManager;
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

        if (user is null)
        {
            return null;
        }

        // Verify if refresh token already exists and remove it
        var refreshToken = await _tokenManager.GetRefreshTokenByUser(user);
        if (refreshToken is not null)
        {
            await _tokenManager.RevokeRefreshToken(refreshToken);
        }

        UserDto userDto = _mapper.Map<UserDto>(user);
        AuthResponseDto authResponse = await _tokenManager.GenerateTokens(user);
        authResponse.User = userDto;

        return authResponse;
    }

    public async Task Logout()
    {
        if (_currentCookies.RefreshToken is null)
        {
            return;
        }

        RefreshToken refreshToken = await _tokenManager.GetRefreshToken(_currentCookies.RefreshToken);

        if (refreshToken is null)
        {
            return;
        }

        await _tokenManager.RevokeRefreshToken(refreshToken);

        await _tokenManager.DeactivateTokenAsync(_currentCookies.Jwt);
    }

    public async Task<AuthResponseDto> RefreshToken()
    {
        TokenRequestDto tokenRequestDto = new() { Token = _currentCookies.Jwt, RefreshToken = _currentCookies.RefreshToken };

        User user = await _userManager.FindByIdAsync(_currentUser.Id);
        UserDto userDto = _mapper.Map<UserDto>(user);

        AuthResponseDto authResponse = await _tokenManager.RefreshToken(tokenRequestDto);
        authResponse.User = userDto;

        return authResponse;
    }

    public async Task<TokenRequestDto> GetAuthCookies()
    {
        TokenRequestDto tokensdto = await Task.Run(() => new TokenRequestDto()
        {
            Token = _currentCookies.Jwt,
            RefreshToken = _currentCookies.RefreshToken,
        });

        return tokensdto;
    }

    public async Task<AuthResponseDto> CheckUserSession()
    {
        User user = await _userManager.FindByIdAsync(_currentUser.Id);
        AuthResponseDto authResponseDto = new()
        {
            Token = _currentCookies.Jwt,
            RefreshToken = _currentCookies.RefreshToken,
            User = _mapper.Map<UserDto>(user)
        };

        return authResponseDto;
    }

}

