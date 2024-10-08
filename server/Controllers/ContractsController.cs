using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContractsController : ControllerBase
{
    private readonly IContractServices _contractServices;

    public ContractsController(IContractServices contractServices)
    {
        _contractServices = contractServices;
    }

    [HttpGet("all")]
    public IActionResult GetAllContracts()
    {
        var contracts = _contractServices.GetAllContracts().Select(c => new ContractDTO {
            Address = c.Address,
            Chain = c.Chain,
            Token = new TokenDto {
                CoinGeckoId = c.Token.CoinGeckoId,
                Symbol = c.Token.Symbol,
                Name = c.Token.Name,
                Image = c.Token.Image
            }
        }).ToList();

        return Ok(contracts);
    }

    [HttpGet("{chain}")]
    public IActionResult GetAllContractsByChain(string chain)
    {
        var contracts = _contractServices.GetAllContractsByChain(chain).Select(c => new ContractDTO {
            Address = c.Address,
            Chain = c.Chain,
            Token = new TokenDto {
                CoinGeckoId = c.Token.CoinGeckoId,
                Symbol = c.Token.Symbol,
                Name = c.Token.Name,
                Image = c.Token.Image
            }
        }).ToList();

        return Ok(contracts);
    }
}