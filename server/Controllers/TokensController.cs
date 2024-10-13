using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Mappers;
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

    [HttpGet, Authorize]
    public IActionResult GetTokens()
    {
        var tokens = _tokenServices.GetAll().ToListDTO();

        return Ok(tokens);
    }
}