namespace server.Models;

public class Wallet
{
    public int Id { get; set; }

    public string Nickname { get; set; }

    public string Address { get; set; }

    public int TracklistId { get; set; }

    public virtual Tracklist Tracklist { get; set; }
}