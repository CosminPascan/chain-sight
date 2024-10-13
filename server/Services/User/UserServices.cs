using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services;

public class UserServices : IUserServices
{
    private readonly AppDbContext _context;

    public UserServices(AppDbContext context)
    {
        _context = context;
    }

    public User GetById(int id)
    {
        return _context.Users.FirstOrDefault(t => t.Id == id);
    }

    public User GetByEmail(string email)
    {
        return _context.Users.FirstOrDefault(u => u.Email == email);
    }

    public async Task<User> GetByRefreshTokenAsync(string refreshToken)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
    }

    public void Create(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }
}