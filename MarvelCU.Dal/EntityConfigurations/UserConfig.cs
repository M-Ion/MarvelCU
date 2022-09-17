using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarvelCU.Dal.EntityConfigurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.FavouriteActors).WithMany(a => a.Users);
        builder.HasMany(u => u.FavouriteHeroes).WithMany(h => h.Users);
        builder.HasMany(u => u.FavouriteMovies).WithMany(m => m.Users);
    }
}

