using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Mappers;
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

    [HttpGet, Authorize]
    public IActionResult GetContracts()
    {
        var contracts = _contractServices.GetAll().ToListDTO();

        return Ok(contracts);
    }

    [HttpGet("{chain}"), Authorize]
    public IActionResult GetContractsByChain(string chain)
    {
        var contracts = _contractServices.GetAllByChain(chain).ToListDTO();

        return Ok(contracts);
    }
}