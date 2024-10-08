using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
    options.AddPolicy("corspolicy", policy => 
        policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseLazyLoadingProxies()
        .UseNpgsql(builder.Configuration["ConnectionStrings:PostgreSQL"]));

builder.Services.AddScoped<IContractServices, ContractServices>();
builder.Services.AddScoped<ITokenServices, TokenServices>();
builder.Services.AddScoped<ITracklistServices, TracklistServices>();
builder.Services.AddScoped<IWalletServices, WalletServices>();

var app = builder.Build();

app.UseCors("corspolicy");
app.UseHttpsRedirection();

app.MapControllers();

app.Run();