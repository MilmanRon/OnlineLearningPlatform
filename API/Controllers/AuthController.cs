using API.Application.DTOs.User;
using API.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AuthController(AuthService authService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserResponseDto>> Register(RegisterUserDto registerUserDto)
    {
        var userResponse = await authService.RegisterAsync(registerUserDto);

        return Ok(userResponse);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserResponseDto>> Login(LoginUserDto loginUserDto)
    {
        var userResponse = await authService.LoginAsync(loginUserDto);

        return Ok(userResponse);
    }
}


