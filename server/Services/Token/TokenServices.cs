using server.Data;
using server.Models;

namespace server.Services;

public class TokenServices : ITokenServices
{
    private readonly AppDbContext _context;

    public TokenServices(AppDbContext context)
    {
        _context = context;
    }

    public ICollection<Token> GetAll()
    {
        return _context.Tokens.ToList();
    }
}