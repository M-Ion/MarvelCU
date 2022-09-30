using MarvelCU.Dal.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace MarvelCU.API.Infrastructure.Filters
{
    public class CurrentUserValidationFilter : IAsyncActionFilter
    {
        private readonly IAuthManager _authManager;

        public CurrentUserValidationFilter(IAuthManager authManager)
        {
            _authManager = authManager;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var identity = context.HttpContext.User.Identity as ClaimsIdentity;
            string email = identity.Claims.FirstOrDefault(c => c.Type == ClaimValueTypes.Email).Value;
      
            var user = await _authManager.GetUserByEmail(email);

            if (user is null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            context.HttpContext.Items.Add("CurrentUser", user);

            await next();
        }
    }
}
