using Microsoft.AspNetCore.Mvc;

namespace MarvelCU.API.Infrastructure.Extensions;

public static class ActionResultAuthCookiesExtension
{
    public static ActionResult SetCookie(
        this ActionResult actionResult, 
        HttpResponse httpResponse, 
        string cookieName, 
        string cookieValue,
        DateTime cookieExpires)
    {
        CookieOptions options = new()
        {
            Expires = cookieExpires,
            HttpOnly = true
        };

        httpResponse.Cookies.Append(cookieName, cookieValue, options);

        return actionResult;
    }

    public static ActionResult ClearCookie(
        this ActionResult actionResult,
        HttpResponse httpResponse, 
        string cookie)
    { 
        httpResponse.Cookies.Delete(cookie);

        return actionResult;
    }
}

