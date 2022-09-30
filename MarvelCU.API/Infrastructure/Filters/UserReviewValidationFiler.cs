using MarvelCU.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MarvelCU.API.Infrastructure.Filters
{
    public class UserReviewValidationFiler : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            User user = context.HttpContext.Items["CurrentUser"] as User;
            Review review = context.HttpContext.Items["Entity"] as Review;
            
            if (!user.Reviews.Contains(review))
            {
                context.Result = new NotFoundResult();
                return;
            }

            await next();
        }
    }
}
