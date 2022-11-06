using Azure.Storage.Blobs;
using MarvelCU.API.Infrastructure.Extensions;
using MarvelCU.Common.Configurations;
using MarvelCU.Dal;
using MarvelCU.Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.OData;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogging(logging =>
{
    logging.AddConfiguration(builder.Configuration.GetSection("Logging"));
    logging.AddDebug();
    logging.AddEventSourceLogger();
});

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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        b => b
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .SetIsOriginAllowed(origin =>
        {
            if (origin.ToLower().StartsWith("http://localhost"))
            {
                return true;
            }
            return false;
        })
    );

});

builder.Services.AddCustomServices();

builder.Services.AddHttpContextAccessor();

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

builder.Services.AddSingleton(x => new BlobServiceClient(builder.Configuration.GetConnectionString("AzureBlobStorageConnectionString")));

builder.Services.AddStackExchangeRedisCache(r => r.Configuration = builder.Configuration["Redis:connectionString"]);

builder.Services.AddSingleton<ChargeService>();

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

app.UseHttpLogging();

app.UseCustomExceptionHandler();

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost");

app.UseAuthentication();
app.UseAuthorization();

app.UseJwtBlackList();

app.UseDbTransaction();


app.MapControllers();

app.Run();
