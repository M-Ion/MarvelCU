using MarvelCU.API.Infrastructure.Filters;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Bll.Services;
using MarvelCU.Dal;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Dal.Repositories;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarvelCU.Tests
{
    public class TestApp : WebApplicationFactory<Program>
    {
        protected override IHost CreateHost(IHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                
            });

            return base.CreateHost(builder);
        }
    }
}
