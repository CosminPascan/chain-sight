using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Mappers;
using server.Services;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TracklistsController : ControllerBase
{
    private readonly ITracklistServices _tracklistServices;

    public TracklistsController(ITracklistServices tracklistServices)
    {
        _tracklistServices = tracklistServices;
    }

    [HttpGet]
    public IActionResult GetTracklists()
    {
        int userId = 1;

        var tracklists = _tracklistServices.GetAll(userId).ToListDTO();

        return Ok(tracklists);
    }

    [HttpGet("{id}")]
    public IActionResult GetTracklist(int id)
    {
        var tracklist = _tracklistServices.GetById(id);

        return Ok(tracklist.ToDTO());
    }

    [HttpPost]
    public IActionResult PostTracklist(TracklistDTO tracklistDTO)
    {
        int userId = 1;

        var tracklist = tracklistDTO.ToItemWithUserId(userId);

        _tracklistServices.Create(tracklist);

        return CreatedAtAction(nameof(GetTracklist), new { id = tracklist.Id }, tracklist.ToDTO());
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteTracklist(int id)
    {
        var exists = _tracklistServices.Exists(id);

        if (!exists) return NotFound();

        _tracklistServices.Delete(id);

        return NoContent();
    }

    [HttpPut("{id}")]
    public IActionResult PutTracklist(int id, TracklistDTO tracklistDTO)
    {
        var exists = _tracklistServices.Exists(id);

        if (!exists) return NotFound();

        var tracklist = tracklistDTO.ToItem();

        _tracklistServices.Update(id, tracklist);

        return NoContent();
    }
}