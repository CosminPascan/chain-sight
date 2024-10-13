using server.Models;

namespace server.Services;

public interface IContractServices
{
    ICollection<Contract> GetAll();

    ICollection<Contract> GetAllByChain(string chain);
}