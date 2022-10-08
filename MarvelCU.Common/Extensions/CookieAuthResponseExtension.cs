using MarvelCU.Common.Dtos.User;
using Microsoft.AspNetCore.Http;

namespace MarvelCU.Common.Extensions;

public static class CookieAuthResponseExtension
{
    public static void SetCookies(
        this AuthResponseDto authResponse, 
        HttpResponse httpResponse,
        DateTime jwtExpires, 
        DateTime refreshTokenExpires
        )
    {
        CookieOptions options = new()
        {
            HttpOnly = true,
        };

        options.Expires = jwtExpires;

        httpResponse.Cookies.Append("jwt", authResponse.Token);

        options.Expires = refreshTokenExpires;

        httpResponse.Cookies.Append("refreshToken", authResponse.RefreshToken);
    }
}

