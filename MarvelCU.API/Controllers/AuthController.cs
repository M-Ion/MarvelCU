﻿using MarvelCU.API.Infrastructure.Extensions;
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
    public ActionResult<TokenRequestDto> GetAuthCookies()
    {
        var reponse = _authService.GetAuthCookies();
        return Ok(reponse);
    }

    [HttpGet("Session")]
    [Authorize]
    public async Task<ActionResult<AuthResponseDto>> CheckUser()
    {
        AuthResponseDto responseDto = await _authService.CheckUserSession();

        if (responseDto == null)
        {
            return BadRequest();
        }

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

        Response.SetCookie("jwt", authResponse.Token, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])));
        Response.SetCookie("refreshToken", authResponse.RefreshToken, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])));

        return Ok(authResponse);
    }

    [HttpPost]
    [Route("Logout")]
    public async Task<ActionResult> Logout()
    {
        await _authService.Logout();

        Response.ClearCookie("jwt");
        Response.ClearCookie("refreshToken");

        return Ok();
    }

    [HttpGet]
    [Route("Refresh")]
    public async Task<ActionResult<AuthResponseDto>> RefreshToken()
    {
        var authResponse = await _authService.RefreshToken();

        Response.SetCookie("jwt", authResponse.Token, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])));

        return Ok(authResponse);
    }
}

