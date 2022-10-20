using MarvelCU.Bll.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace MarvelCU.Bll.Services;

public class HttpContextCurrentUser : ICurrentUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HttpContextCurrentUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Id
    {
        get
        {
            var httpContext = _httpContextAccessor.HttpContext;
            return httpContext.User.Claims.FirstOrDefault(c => c.Type == "uid")?.Value;
        }
    }

    public string Email
    {
        get
        {
            var httpContext = _httpContextAccessor.HttpContext;
            return httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimValueTypes.Email)?.Value;
        }
    }

    public IList<string> Roles
    {
        get
        {
            var httpContext = _httpContextAccessor.HttpContext;
            return httpContext.User.Claims
                .Where(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")
                .Select(r => r.Value)
                .ToList();
        }
    }

    public string Jwt
    {
        get
        {
            var httpContext = _httpContextAccessor.HttpContext;
            return ((string)httpContext.Request.Headers.Authorization).Replace("Bearer ", "");
        }
    }
}

