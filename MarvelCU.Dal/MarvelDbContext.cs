using MarvelCU.Dal.EntityConfigurations;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.Dal;

public class MarvelDbContext : IdentityDbContext<User>
{
    public MarvelDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Actor> Actors { get; set; }

    public DbSet<Movie> Movies { get; set; }

    public DbSet<Review> Reviews { get; set; }

    public DbSet<News> News { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new NewsConfig());
        modelBuilder.ApplyConfiguration(new ReviewConfig());
    }
}

