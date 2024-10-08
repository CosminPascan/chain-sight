using server.Models;

namespace server.Services;

public interface ITokenServices 
{
    ICollection<Token> GetAllTokens();
}