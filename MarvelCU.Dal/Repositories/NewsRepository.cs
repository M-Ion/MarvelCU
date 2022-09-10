using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Repositories;

public class NewsRepository : GenericRepository<News>, INewsRepository
{
    public NewsRepository(MarvelDbContext context) : base(context)
    {
    }
}

