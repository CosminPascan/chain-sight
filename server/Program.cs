using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(x => 
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
    options.AddPolicy("corspolicy", policy => 
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseLazyLoadingProxies()
        .UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"]));

builder.Services.AddScoped<IAuthServices, AuthServices>();
builder.Services.AddScoped<IContractServices, ContractServices>();
builder.Services.AddScoped<ITokenServices, TokenServices>();
builder.Services.AddScoped<ITracklistServices, TracklistServices>();
builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<IWalletServices, WalletServices>();

var app = builder.Build();

app.UseCors("corspolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();