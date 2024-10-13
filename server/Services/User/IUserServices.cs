using server.Models;

namespace server.Services;

public interface IUserServices
{
    User GetById(int id);

    User GetByEmail(string email); 

    Task<User> GetByRefreshTokenAsync(string refreshToken);

    void Create(User user);
}