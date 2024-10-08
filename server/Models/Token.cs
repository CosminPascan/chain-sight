namespace server.Models;

public class Token
{
    public int Id { get; set; }

    public string CoinGeckoId { get; set; }

    public string Symbol { get; set; }

    public string Name { get; set; }

    public string Image { get; set; }

    public virtual ICollection<Contract> Contracts { get; set; }
}