using Microsoft.AspNetCore.Authorization;
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

    [HttpGet, Authorize]
    public IActionResult GetTracklists()
    {
        var userId = Convert.ToInt32(HttpContext.User.FindFirst("id").Value);
       
        var tracklists = _tracklistServices.GetAll(userId).ToListDTO();

        return Ok(tracklists);
    }

    [HttpGet("{id}"), Authorize]
    public IActionResult GetTracklist(int id)
    {
        var tracklist = _tracklistServices.GetById(id);

        return Ok(tracklist.ToDTO());
    }

    [HttpPost, Authorize]
    public IActionResult PostTracklist(TracklistDTO tracklistDTO)
    {
        var userId = Convert.ToInt32(HttpContext.User.FindFirst("id").Value);

        var tracklist = tracklistDTO.ToItemWithUserId(userId);

        _tracklistServices.Create(tracklist);

        return CreatedAtAction(nameof(GetTracklist), new { id = tracklist.Id }, tracklist.ToDTO());
    }

    [HttpDelete("{id}"), Authorize]
    public IActionResult DeleteTracklist(int id)
    {
        var exists = _tracklistServices.Exists(id);

        if (!exists) return NotFound();

        _tracklistServices.Delete(id);

        return NoContent();
    }

    [HttpPut("{id}"), Authorize]
    public IActionResult PutTracklist(int id, TracklistDTO tracklistDTO)
    {
        var exists = _tracklistServices.Exists(id);

        if (!exists) return NotFound();

        var tracklist = tracklistDTO.ToItem();

        _tracklistServices.Update(id, tracklist);

        return NoContent();
    }
}