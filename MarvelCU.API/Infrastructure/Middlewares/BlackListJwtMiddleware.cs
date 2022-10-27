using MarvelCU.Dal.Interfaces;
using System.Net;

namespace MarvelCU.API.Infrastructure.Middlewares
{
    public class BlackListJwtMiddleware
    {
        private readonly RequestDelegate _next;

        public BlackListJwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext, ITokenManager tokenManager)
        {
            if ((string)httpContext.Request.Headers.Authorization is string token)
            {
                string jwt = token.Split(" ").Last();

                if (!await tokenManager.IsActiveTokenAsync(jwt))
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return;
                }
            }

            await _next(httpContext);

            return;
        }
    }
}
