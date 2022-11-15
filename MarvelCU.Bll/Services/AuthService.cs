using AutoMapper;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

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

        AuthResponseDto authResponse = await _tokenManager.GenerateTokens(user);
        authResponse.User = await PrepareUserData(user);

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

        AuthResponseDto authResponse = await _tokenManager.RefreshToken(tokenRequestDto);

        RefreshToken stored = await _tokenManager.GetRefreshToken(authResponse.RefreshToken);
        User user = await _userManager.FindByIdAsync(stored.UserId);

        authResponse.User = await PrepareUserData(user);

        return authResponse;
    }

    public TokenRequestDto GetAuthCookies()
    {
        // Remove async
        TokenRequestDto tokensdto = new TokenRequestDto()
        {
            Token = _currentCookies.Jwt,
            RefreshToken = _currentCookies.RefreshToken,
        };

        return tokensdto;
    }

    public async Task<AuthResponseDto> CheckUserSession()
    {
        if (_currentCookies.Jwt is null) return null;

        JwtSecurityToken jwt = _tokenManager.ReadJwt(_currentCookies.Jwt);
        string uid = jwt.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;

        if (uid is null) return null;

        User user = await _userManager.FindByIdAsync(uid);
        AuthResponseDto authResponseDto = new()
        {
            Token = _currentCookies.Jwt,
            RefreshToken = _currentCookies.RefreshToken,
            User = await PrepareUserData(user)
        };

        return authResponseDto;
    }

    private async Task<UserDto> PrepareUserData(User user)
    {
        UserDto userDto = _mapper.Map<UserDto>(user);

        IList<string> roles = await _userManager.GetRolesAsync(user);

        userDto.Roles = roles;

        return userDto;
    }

}

