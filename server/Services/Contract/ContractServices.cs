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

    public ICollection<Contract> GetAll()
    {
        return _context.Contracts.ToList();
    }

    public ICollection<Contract> GetAllByChain(string chain)
    {
        return _context.Contracts.Where(c => c.Chain == chain).ToList();
    }
}