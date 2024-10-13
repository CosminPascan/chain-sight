using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services;

public class TracklistServices : ITracklistServices
{
    private readonly AppDbContext _context;

    public TracklistServices(AppDbContext context)
    {
        _context = context;
    }

    public ICollection<Tracklist> GetAll(int userId)
    {
        var tracklists = _context.Tracklists
            .Where(t => t.UserId == userId)
            .ToList();

        return tracklists;
    }

    public Tracklist GetById(int id)
    {
        return _context.Tracklists.FirstOrDefault(t => t.Id == id);
    }

    public void Create(Tracklist tracklist)
    {
        _context.Tracklists.Add(tracklist);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var tracklist = _context.Tracklists.First(t => t.Id == id);

        _context.Wallets.Where(w => w.TracklistId == id).ExecuteDelete();
        _context.Tracklists.Remove(tracklist);

        _context.SaveChanges();
    }

    public void Update(int id, Tracklist newTracklist)
    {
        var tracklist = _context.Tracklists.First(t => t.Id == id);

        tracklist.Name = newTracklist.Name;

        _context.SaveChanges();
    }

    public bool Exists(int id)
    {
        return _context.Tracklists.Any(t => t.Id == id);
    }
}