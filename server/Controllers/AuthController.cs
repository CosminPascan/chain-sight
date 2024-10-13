using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Mappers;
using server.Services;

namespace server.Controllers;

[Route("api")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserServices _userServices;
    private readonly IAuthServices _authServices;

    public AuthController(IUserServices userServices, IAuthServices authServices)
    {
        _userServices = userServices;
        _authServices = authServices;
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        var user = _userServices.GetById(id);

        return Ok(user.ToDTO());
    }

    [HttpPost("register")]
    public IActionResult Register(UserDTO dto)
    {
        var u = _userServices.GetByEmail(dto.Email);

        if (u != null) return StatusCode(409, new { message = $"Email {u.Email} already used!" });

        var user = dto.ToItem();

        _userServices.Create(user);

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user.ToDTO());
    }

    [HttpPost("login")]
    public IActionResult Login(UserDTO dto)
    {
        var user = _userServices.GetByEmail(dto.Email);

        if (user == null) return NotFound(new { message = "Invalid email!" });

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)) return NotFound(new { message = "Invalid password!" });

        var accessToken = _authServices.GenerateAccessToken(user);
        var refreshToken = _authServices.GenerateRefreshToken();

        _authServices.AssignRefreshToken(refreshToken, user.Id);

        SetRefreshTokenCookies(user.RefreshToken, user.RefreshTokenExpiryDate);

        return Ok(new { accessToken });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refresh-token"];

        if (refreshToken == null) return Unauthorized(new { message = "Refresh token has expired! Please login again!" });

        var user = await _userServices.GetByRefreshTokenAsync(refreshToken);

        var accessToken = _authServices.GenerateAccessToken(user);

        return Ok(new { accessToken });
    }

    private void SetRefreshTokenCookies(string refreshToken, DateTime expiryDate)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = expiryDate
        };

        Response.Cookies.Append("refresh-token", refreshToken, cookieOptions);
    }
}