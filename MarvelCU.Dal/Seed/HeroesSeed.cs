using MarvelCU.Domain;

namespace MarvelCU.Dal.Seed;

public class HeroesSeed
{
    public static async Task Seed(MarvelDbContext context)
    {
        if (!context.Heores.Any())
        {
            context.Heores.AddRange(
                );

            await context.SaveChangesAsync();
        }
    }
}

