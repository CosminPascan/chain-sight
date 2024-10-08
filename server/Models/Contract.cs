namespace server.Models;

public class Contract
{
    public int Id { get; set; }

    public string Address { get; set; }

    public string Chain { get; set; }
 
    public virtual Token Token { get; set; }
}