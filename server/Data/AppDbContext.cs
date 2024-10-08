using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Contract> Contracts { get; set; }

    public DbSet<Token> Tokens { get; set; }

    public DbSet<Tracklist> Tracklists { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<Wallet> Wallets { get; set; }
}