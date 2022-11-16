using BarbershopBooking.Application.Common.Interfaces;
using BarbershopBooking.Infrastructure.Identity;
using BarbershopBooking.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;
using BarbershopBooking.Infrastructure.Identity.Jwt;
using BarbershopBooking.Infrastructure.Identity.Jwt.Interfaces;
using BarbershopBooking.Infrastructure.Identity.Entities;
using Microsoft.Extensions.Options;

namespace BarbershopBooking.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        //var jwtSettings = new JwtSettings();
        //configuration.Bind(nameof(JwtSettings), jwtSettings);
        //services.AddSingleton(jwtSettings);
        services.Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));

        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<IJwtService, JwtService>();
        services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.Password.RequireDigit = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 3;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(services.BuildServiceProvider().GetRequiredService<IOptions<JwtSettings>>().Value.Secret)),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = true,
        };

        services.AddSingleton(tokenValidationParameters);

        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = tokenValidationParameters;
            });
        //.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
        //    options => builder.Configuration.Bind("CookieSettings", options));
        return services;
    }
}
