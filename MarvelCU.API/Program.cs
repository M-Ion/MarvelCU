using MarvelCU.API.Infrastructure.Extensions;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Bll.Services;
using MarvelCU.Common.Configurations;
using MarvelCU.Dal;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Dal.Repositories;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("MarvelDbConnectionString");
builder.Services.AddDbContext<MarvelDbContext>(options =>
{
    options.UseLazyLoadingProxies().UseSqlServer(connectionString);
});

builder.Services.AddIdentityCore<User>().AddRoles<IdentityRole>().AddEntityFrameworkStores<MarvelDbContext>();

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

builder.Services.AddAutoMapper(typeof(MapperConfig));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(typeof(IRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IActorRepository, ActorRepository>();
builder.Services.AddScoped<IActorService, ActorService>();
builder.Services.AddScoped<IMovieRepository, MovieRepository>();
builder.Services.AddScoped<IMovieService, MovieService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IHeroRepository, HeroRepository>();
builder.Services.AddScoped<IHeroService, HeroService>();

var app = builder.Build();

await app.SeedData();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
