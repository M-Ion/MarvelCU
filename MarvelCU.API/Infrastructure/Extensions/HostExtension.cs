using MarvelCU.Dal;
using MarvelCU.Dal.Seed;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.API.Infrastructure.Extensions;

public static class HostExtension
{
    public static async Task SeedData(this IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<MarvelDbContext>();

                context.Database.Migrate();

                await HeroesSeed.Seed(context);
            }
            catch (Exception e)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(e, "An error occured during data seeding migration!");
            }
        }
    }
}

