using MarvelCU.API.Infrastructure.Extensions;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using MarvelCU.Common.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _configuration;

    public AuthController(IAuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<TokenRequestDto>> GetAuthCookies()
    {
        var reponse = await _authService.GetAuthCookies();
        return Ok(reponse);
    }

    [HttpGet("Session")]
    [Authorize]
    public async Task<ActionResult<AuthResponseDto>> CheckUser()
    {
        AuthResponseDto responseDto = await _authService.CheckUserSession();
        return Ok(responseDto);
    }

    [HttpPost]
    [Route("Register")]
    public async Task<ActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        var errors = await _authService.Register(registerUserDto);

        if (errors.Any())
        {
            return BadRequest(errors);
        }

        return Ok();
    }

    [HttpPost]
    [Route("Login")]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginUserDto loginUserDto)
    {
        AuthResponseDto authResponse = await _authService.Login(loginUserDto);

        if (authResponse is null)
        {
            return BadRequest();
        }

        return Ok(authResponse)
            .SetCookie(Response, "jwt", authResponse.Token, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])))
            .SetCookie(Response, "refreshToken", authResponse.RefreshToken, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])));
    }

    [HttpPost]
    [Route("Logout")]
    public async Task<ActionResult> Logout()
    {
        await _authService.Logout();

        return Ok()
            .ClearCookie(Response, "jwt")
            .ClearCookie(Response, "refreshToken");
    }

    [HttpGet]
    [Route("Refresh")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken()
    {
        var authResponse = await _authService.RefreshToken();
        return Ok(authResponse)
            .SetCookie(Response, "jwt", authResponse.Token, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])))
            .SetCookie(Response, "refreshToken", authResponse.RefreshToken, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"]))); ;
    }
}

