using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
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
    public async Task<ActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        AuthResponseDto authResponse = await _authService.Login(loginUserDto);

        if (authResponse is null) return Unauthorized();

        return Ok(authResponse);
    }
}

