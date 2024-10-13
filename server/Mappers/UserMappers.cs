using server.DTOs;
using server.Models;

namespace server.Mappers;

public static class UserMappers
{
    public static User ToItem(this UserDTO userDTO)
    {
        return new User
        {
            Id = userDTO.Id,
            Username = userDTO.Username,
            Email = userDTO.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password)
        };
    }

    public static UserDTO ToDTO(this User user)
    {
        return new UserDTO
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email
        };
    }
}