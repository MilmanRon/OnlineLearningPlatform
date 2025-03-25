using API.Application.DTOs.User;
using API.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController(IUserService userService) : BaseApiController
    {
        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetUser(Guid id)
        {
            return Ok(await userService.GetUserByIdAsync(id));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            await userService.DeleteUserAsync(id);

            return NoContent();
        }

    }
}
