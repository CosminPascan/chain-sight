using server.DTOs;
using server.Models;

namespace server.Mappers;

public static class TracklistMappers
{
    public static Tracklist ToItem(this TracklistDTO tracklistDTO)
    {
        return new Tracklist
        {
            Id = tracklistDTO.Id,
            Name = tracklistDTO.Name
        };
    }

    public static Tracklist ToItemWithUserId(this TracklistDTO tracklistDTO, int userId)
    {
        return new Tracklist
        {
            Id = tracklistDTO.Id,
            Name = tracklistDTO.Name,
            UserId = userId
        };
    }

    public static TracklistDTO ToDTO(this Tracklist tracklist)
    {
        return new TracklistDTO
        {
            Id = tracklist.Id,
            Name = tracklist.Name
        };
    }

    public static ICollection<TracklistDTO> ToListDTO(this ICollection<Tracklist> tracklists)
    {
        return tracklists.Select(t => t.ToDTO()).ToList();
    }
}