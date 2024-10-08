namespace server.Models;

public class User
{
    public int Id { get; set; }

    public string Username { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public virtual ICollection<Tracklist> Tracklists  { get; set; }
}
