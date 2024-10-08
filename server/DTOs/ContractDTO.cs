namespace server.DTOs;

public class ContractDTO
{
    public string Address { get; set; }

    public string Chain { get; set; }

    public TokenDto Token { get; set; }
}