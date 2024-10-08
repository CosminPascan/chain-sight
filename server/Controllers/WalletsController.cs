using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Mappers;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WalletsController : ControllerBase
{
    private readonly IWalletServices _walletServices;

    public WalletsController(IWalletServices walletServices)
    {
        _walletServices = walletServices;
    }

    [HttpGet("{tracklistId}")]
    public IActionResult GetWalletsByTracklistId(int tracklistId)
    {
        var wallets = _walletServices.GetAll(tracklistId).ToListDTO();

        return Ok(wallets);
    }

    [HttpGet("single/{id}")]
    public IActionResult GetWallet(int id)
    {
        var wallet = _walletServices.GetById(id);

        return Ok(wallet.ToDTO());
    }

    [HttpPost("{tracklistId}")]
    public IActionResult PostWallet(int tracklistId, WalletDTO walletDTO)
    {
        var wallet = walletDTO.ToItemWithTracklistId(tracklistId);

        _walletServices.Create(wallet);

        return CreatedAtAction(nameof(GetWallet), new { id = wallet.Id }, wallet.ToDTO());
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteWallet(int id)
    {
        var exists = _walletServices.Exists(id);

        if (!exists) return NotFound();

        _walletServices.Delete(id);

        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult PutWallet(int id, WalletDTO walletDTO)
    {
        var exists = _walletServices.Exists(id);

        if (!exists) return NotFound();

        var wallet = walletDTO.ToItem();

        _walletServices.Update(id, wallet);

        return NoContent();
    }
}