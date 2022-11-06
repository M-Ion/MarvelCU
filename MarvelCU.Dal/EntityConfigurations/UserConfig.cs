using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarvelCU.Dal.EntityConfigurations;

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasMany(u => u.FavouriteMovies).WithMany(m => m.Users);
        builder.HasMany(u => u.BoughtMovies).WithMany(m => m.Customers).UsingEntity(j => j.ToTable("BoughtMoviesUsers"));
    }
}

