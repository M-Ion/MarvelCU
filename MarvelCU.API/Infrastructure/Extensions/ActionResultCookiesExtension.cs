using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Infrastructure.Extensions;

public static class ActionResultAuthCookiesExtension
{
    public static void SetCookie(
        this HttpResponse httpResponse, 
        string cookieName, 
        string cookieValue,
        DateTime cookieExpires)
    {
        CookieOptions options = new()
        {
            Expires = cookieExpires,
            HttpOnly = true,
            IsEssential = true,
            Secure = true,
            SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None,
        };

        httpResponse.Cookies.Append(cookieName, cookieValue, options);
    }

    public static void ClearCookie(
        this HttpResponse httpResponse, 
        string cookie)
    { 
        httpResponse.Cookies.Delete(cookie, new CookieOptions()
        {
            HttpOnly = true,
            IsEssential = true,
            Secure = true,
            SameSite = Microsoft.AspNetCore.Http.SameSiteMode.None,
        });
    }
}

