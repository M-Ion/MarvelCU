using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.Dal;

public class MarvelDbContext : IdentityDbContext<User>
{
    public MarvelDbContext(DbContextOptions options) : base(options)
    {
    }
}

