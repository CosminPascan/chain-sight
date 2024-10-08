using server.Models;

namespace server.Services;

public interface IContractServices
{
    ICollection<Contract> GetAllContracts();

    ICollection<Contract> GetAllContractsByChain(string chain);
}