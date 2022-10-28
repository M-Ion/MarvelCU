using MarvelCU.API.Infrastructure.Middlewares;

namespace MarvelCU.API.Infrastructure.Extensions;

public static class MiddlewareExtension
{
    public static IApplicationBuilder UseDbTransaction(this IApplicationBuilder app)
    {
        app.UseMiddleware<DbTransactionMiddleware>();
        return app;
    }

    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
    {
        app.UseMiddleware<ExceptionHandlingMiddleware>();
        return app;
    }

    public static IApplicationBuilder UseJwtBlackList(this IApplicationBuilder app)
    {
        app.UseMiddleware<BlackListJwtMiddleware>();
        return app;
    }
}


