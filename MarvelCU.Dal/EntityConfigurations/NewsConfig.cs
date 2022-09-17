using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MarvelCU.Dal.EntityConfigurations;

public class NewsConfig : IEntityTypeConfiguration<News>
{
    public void Configure(EntityTypeBuilder<News> builder)
    {
        builder.Property(p => p.Posted).HasDefaultValueSql("GetUtcDate()");
        builder.Property(p => p.Updated).ValueGeneratedOnUpdate();
        builder.Property(p => p.RowVersion).IsRowVersion();
    }
}

