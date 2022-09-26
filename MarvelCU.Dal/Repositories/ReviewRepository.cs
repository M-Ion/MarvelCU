using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;

namespace MarvelCU.Dal.Repositories;

public class ReviewRepository : GenericRepository<Review>, IReviewRepository
{
    private readonly MarvelDbContext _context;

    public ReviewRepository(MarvelDbContext context) : base(context)
    {
        _context = context;
    }
}

