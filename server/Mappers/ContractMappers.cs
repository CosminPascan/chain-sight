using server.DTOs;
using server.Models;

namespace server.Mappers;

public static class ContractMappers
{
    public static ContractDTO ToDTO(this Contract contract)
    {
        return new ContractDTO
        {
            Address = contract.Address,
            Chain = contract.Chain,
            Token = contract.Token.ToDTO()
        };
    }

    public static ICollection<ContractDTO> ToListDTO(this ICollection<Contract> contracts)
    {
        return contracts.Select(c => c.ToDTO()).ToList();
    }
}