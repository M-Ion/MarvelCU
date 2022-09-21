using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Dal.Seed;

public class RolesSeed
{
    public static async Task Seed(MarvelDbContext context)
    {
        if (!context.Roles.Any())
        {
            context.Roles.AddRange(
                new IdentityRole { Name = "User", NormalizedName = "USER" }
                );

            await context.SaveChangesAsync();
        }
    }
}

