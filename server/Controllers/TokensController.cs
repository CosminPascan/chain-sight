using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TokensController : ControllerBase
{
    private readonly ITokenServices _tokenServices;

    public TokensController(ITokenServices tokenServices)
    {
        _tokenServices = tokenServices;
    }

    [HttpGet("all")]
    public IActionResult GetAllTokens()
    {
        var tokens = _tokenServices.GetAllTokens().Select(t => new TokenDto
        {
            CoinGeckoId = t.CoinGeckoId,
            Symbol = t.Symbol,
            Name = t.Name,
            Image = t.Image
        }).ToList();

        return Ok(new { tokens });
    }
}