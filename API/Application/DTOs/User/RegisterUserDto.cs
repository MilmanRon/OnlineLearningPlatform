﻿namespace API.Application.DTOs.User
{
    public class RegisterUserDto
    {
        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
