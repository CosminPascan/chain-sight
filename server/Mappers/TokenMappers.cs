using server.DTOs;
using server.Models;

namespace server.Mappers;

public static class TokenMappers
{
    public static TokenDTO ToDTO(this Token token)
    {
        return new TokenDTO
        {
            CoinGeckoId = token.CoinGeckoId,
            Name = token.Name
        };
    }

    public static ICollection<TokenDTO> ToListDTO(this ICollection<Token> tokens)
    {
        return tokens.Select(t => t.ToDTO()).ToList();
    }
}