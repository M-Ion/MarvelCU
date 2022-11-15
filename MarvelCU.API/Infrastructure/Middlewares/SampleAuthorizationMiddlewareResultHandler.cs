using MarvelCU.API.Infrastructure.Extensions;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Common.Dtos.User;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.Extensions.Primitives;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MarvelCU.API.Infrastructure.Middlewares
{
    public class SampleAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        private readonly IAuthorizationService _authorizationService;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        public SampleAuthorizationMiddlewareResultHandler(
            IAuthorizationService authorizationService,
            JwtSecurityTokenHandler jwtSecurityTokenHandler,
            IAuthService authService, 
            IConfiguration configuration
            )
        {
            _authorizationService = authorizationService;
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _authService = authService;
            _configuration = configuration;
        }

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            bool authProvided = context.Request.Headers["Authorization"] != StringValues.Empty;

            if (authorizeResult.Challenged && authProvided)
            {
                AuthResponseDto authResponse = await _authService.RefreshToken();

                context.User = GenerateHttpContextUser(authResponse.Token);

                SetCookies(context.Response, authResponse);

                authorizeResult = PolicyAuthorizationResult.Success();

                var authResult = await _authorizationService.AuthorizeAsync(context.User, policy);

                if (!authResult.Succeeded)
                    authorizeResult = PolicyAuthorizationResult.Forbid();
            }

            await defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }

        private ClaimsPrincipal GenerateHttpContextUser(string token)
        {
            JwtSecurityToken jwt = _jwtSecurityTokenHandler.ReadJwtToken(token);
            ClaimsIdentity identity = new ClaimsIdentity(jwt.Claims, "Refresh");

            return new ClaimsPrincipal(identity);
        }

        private void SetCookies(HttpResponse httpResponse, AuthResponseDto authResponse)
        {
            httpResponse.SetCookie("jwt", authResponse.Token, DateTime.UtcNow.AddMonths(Convert.ToInt32(_configuration["JwtConfig:RefreshTokenDurationInMonths"])));
        }
    }
}
