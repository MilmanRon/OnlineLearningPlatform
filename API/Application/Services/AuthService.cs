﻿using API.Application.DTOs.User;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using System.Security.Cryptography;
using System.Text;

namespace API.Application.Services
{
    public class AuthService(
        ITokenService tokenService,
        IUserRepository userRepository) : IAuthService
    {
        public async Task<UserResponseDto> RegisterAsync(RegisterUserDto registerUserDto)
        {
            if (registerUserDto == null)
                throw new ArgumentNullException(nameof(registerUserDto));

            if (await userRepository.HasUserWithEmailAsync(registerUserDto.Email))
                throw new UserAlreadyExistsException(registerUserDto.Email);

            using var hmac = new HMACSHA512();

            var user = new User
            {
                Email = registerUserDto.Email,
                Name = registerUserDto.Name,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUserDto.Password)),
                PasswordSalt = hmac.Key
            };

            await userRepository.AddUserAsync(user);

            return new UserResponseDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Token = tokenService.CreateToken(user)
            };

        }

        public async Task<UserResponseDto> LoginAsync(LoginUserDto loginUserDto)
        {
            if (loginUserDto == null)
                throw new ArgumentNullException(nameof(loginUserDto));

            var user = await userRepository.GetUserByEmail(loginUserDto.Email);

            if (user == null)
                throw new NoMatchingEmailException(loginUserDto.Email);

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginUserDto.Password));

            for (int i = 0; i < computeHash.Length; i++)
            {
                if (computeHash[i] != user.PasswordHash[i]) 
                    throw new PasswordDoesntMatchException();
            }

            return new UserResponseDto
            {
                Email = user.Email,
                Name = user.Name,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
