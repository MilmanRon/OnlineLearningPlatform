using API.Application.DTOs.User;

namespace API.Application.Interfaces
{
    public interface IAuthService
    {
        Task<UserResponseDto> RegisterAsync(RegisterUserDto registerUserDto);

        Task<UserResponseDto> LoginAsync(LoginUserDto loginUserDto);
    }
}
