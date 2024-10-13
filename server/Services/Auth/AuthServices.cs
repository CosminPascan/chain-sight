using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Models;

namespace server.Services;

public class AuthServices : IAuthServices
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public AuthServices(IConfiguration configuration, AppDbContext context)
    {
        _configuration = configuration;
        _context = context;
    }

    public string GenerateAccessToken(User user)
    {
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));
        var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        var securityToken = new JwtSecurityToken(
            claims: new List<Claim> {
                new Claim("id", user.Id.ToString()),
                new Claim("e-mail", user.Email)
            },
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }

    public string GenerateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }
    
    public void AssignRefreshToken(string refreshToken, int id)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == id);
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryDate = DateTime.UtcNow.AddDays(7);
        _context.SaveChanges();
    }
}