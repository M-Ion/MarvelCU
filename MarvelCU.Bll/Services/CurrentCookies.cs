using MarvelCU.Bll.Interfaces;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Bll.Services;

public class CurrentCookies : ICurrentCookies
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentCookies(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Jwt
    {
        get
        {
            return _httpContextAccessor.HttpContext.Request.Cookies["jwt"];
        }
    }

    public string RefreshToken
    {
        get
        {
            return _httpContextAccessor.HttpContext.Request.Cookies["refreshToken"];
        }
    }
}

