using server.Models;

namespace server.Services;

public interface IAuthServices 
{
    string GenerateAccessToken(User user);

    string GenerateRefreshToken();

    void AssignRefreshToken(string refreshToken, int id);
}