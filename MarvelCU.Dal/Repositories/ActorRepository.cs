﻿using MarvelCU.Dal.Interfaces;
using MarvelCU.Domain;
using Microsoft.EntityFrameworkCore;

namespace MarvelCU.Dal.Repositories;

public class ActorRepository : GenericRepository<Actor>, IActorRepository
{
    private readonly MarvelDbContext _context;

    public ActorRepository(MarvelDbContext context) : base(context)
    {
        _context = context;
    }
}

