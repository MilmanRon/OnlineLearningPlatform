using API.Application.DTOs.User;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
    {

        public async Task<UserResponseDto> GetUserByIdAsync(Guid id)
        {
            var userDb = await userRepository.GetUserByIdAsync(id);

            return mapper.Map<UserResponseDto>(userDb);
        }

        public async Task DeleteUserAsync(Guid id)
        {
            await userRepository.DeleteUserAsync(id);
        }
    }
}
