using API.Application.DTOs.User;

namespace API.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserResponseDto> GetUserByIdAsync(Guid id);

        Task DeleteUserAsync(Guid id);
    }
}
