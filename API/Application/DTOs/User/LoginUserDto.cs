namespace API.Application.DTOs.User
{
    public class LoginUserDto
    {
        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}
