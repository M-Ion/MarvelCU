using MarvelCU.API.Infrastructure.Extensions;
using MarvelCU.API.Infrastructure.Middlewares;
using MarvelCU.Bll.Interfaces;
using MarvelCU.Bll.Services;
using MarvelCU.Common.Configurations;
using MarvelCU.Dal;
using MarvelCU.Dal.Interfaces;
using MarvelCU.Dal.Repositories;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("MarvelDbConnectionString");
builder.Services.AddDbContext<MarvelDbContext>(options =>
{
    options.UseLazyLoadingProxies().UseSqlServer(connectionString);
});

builder.Services
    .AddIdentityCore<User>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<User>>("MarvelCUAPI")
    .AddEntityFrameworkStores<MarvelDbContext>()
    .AddDefaultTokenProviders();

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
builder.Services.AddScoped<IAuthManager, AuthManager>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenManager, TokenManager>();
builder.Services.AddScoped<IPaymentManager, PaymentManager>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

TokenValidationParameters tokenValidationParameters = new()
{
    ValidateIssuerSigningKey = true,
    ValidateIssuer = true,
    ValidateLifetime = true,
    ClockSkew = TimeSpan.Zero,
    ValidIssuer = builder.Configuration["JwtConfig:Issuer"],
    ValidAudience = builder.Configuration["JwtConfig:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtConfig:Key"])),
};

builder.Services.AddSingleton(tokenValidationParameters);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = tokenValidationParameters;
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
).AddOData(options =>
{
    options.Select().Filter().OrderBy();
});

StripeConfiguration.ApiKey = builder.Configuration["StripeConfig:SecretKey"];

var app = builder.Build();

await app.SeedData();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
