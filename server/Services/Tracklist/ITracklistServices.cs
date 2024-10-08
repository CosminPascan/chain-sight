using server.DTOs;
using server.Models;

namespace server.Services;

public interface ITracklistServices
{
    ICollection<Tracklist> GetAll(int userId);

    Tracklist GetById(int id);

    void Create(Tracklist tracklist);

    void Delete(int id);

    void Update(int id, Tracklist tracklist);

    bool Exists(int id);
}