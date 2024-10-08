using server.Data;
using server.Models;

namespace server.Services;

public class ContractServices : IContractServices
{
    private readonly AppDbContext _context;

    public ContractServices(AppDbContext context)
    {
        _context = context;
    }

    public ICollection<Contract> GetAllContracts()
    {
        return _context.Contracts.ToList();
    }

    public ICollection<Contract> GetAllContractsByChain(string chain)
    {
        return _context.Contracts.Where(c => c.Chain == chain).ToList();
    }
}