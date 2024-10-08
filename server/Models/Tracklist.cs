namespace server.Models;

public class Tracklist
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int UserId { get; set; }

    public virtual User User { get; set; }

    public virtual ICollection<Wallet> Wallets { get; set; }  
}