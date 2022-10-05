using MarvelCU.Bll.Interfaces;
using MarvelCU.Bll.Services;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Dal.Repositories;

namespace MarvelCU.API.Infrastructure.Extensions;

public static class AddCustomServicesExtension
{
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        services.AddScoped<ICurrentUser, HttpContextCurrentUser>();

        services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));

        services.AddScoped<IActorRepository, ActorRepository>();
        services.AddScoped<IActorService, ActorService>();

        services.AddScoped<IMovieRepository, MovieRepository>();
        services.AddScoped<IMovieService, MovieService>();

        services.AddScoped<IHeroRepository, HeroRepository>();
        services.AddScoped<IHeroService, HeroService>();

        services.AddScoped<INewsRepository, NewsRepository>();
        services.AddScoped<INewsService, NewsService>();

        services.AddScoped<IReviewRepository, ReviewRepository>();
        services.AddScoped<IReviewService, ReviewService>();

        services.AddScoped<IAuthManager, AuthManager>();
        services.AddScoped<IAuthService, AuthService>();

        services.AddScoped<ITokenManager, TokenManager>();

        services.AddScoped<IPaymentManager, PaymentManager>();

        services.AddScoped<ICloudStorageManager, CloudStorageManager>();
        services.AddScoped<ICloudStorageService, CloudStorageService>();

        return services;
    }
}

