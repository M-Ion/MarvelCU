using Microsoft.AspNetCore.Identity;

namespace MarvelCU.Dal.Seed;

public class RolesSeed
{
    public static async Task Seed(MarvelDbContext context)
    {
        if (context.Roles.Count() <= 1)
        {
            context.Roles.AddRange(
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );

            await context.SaveChangesAsync();
        }
    }
}

