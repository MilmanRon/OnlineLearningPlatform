using API.Application.DTOs.Enrollment;
using API.Application.DTOs.Progress;
using API.Application.DTOs.User;
using API.Application.Interfaces;
using API.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserService userService) : BaseApiController
    {
        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetUser(Guid id)
        {
            return Ok(await userService.GetUserByIdAsync(id));
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateUser(UpdateUserDto updateUserDto, Guid id)
        {
            updateUserDto.Id = id;
            return Accepted(await userService.UpdateUserAsync(updateUserDto));
        }

        [HttpGet("{id:guid}/enrollments")]
        public async Task<ActionResult> GetUserEnrollments(Guid id)
        {
            return Ok(await userService.GetUserEnrollments(id));
        }

        [HttpGet("{id:guid}/progress")]
        public async Task<ActionResult> GetUserProgress(Guid id)
        {
            return Ok(await userService.GetUserProgress(id));
        }

        [HttpPost("{id:guid}/enrollments")]
        public async Task<ActionResult> EnrollUser(AddEnrollmentDto addEnrollmentDto, Guid id)
        {
            return Ok(await userService.EnrollUser(addEnrollmentDto, id));
        }

        [HttpPost("{id:guid}/progress")]
        public async Task<ActionResult> AddProgress(AddProgressDto addProgressDto, Guid id)
        {
            return Ok(await userService.AddProgress(addProgressDto, id));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteUser(Guid id)
        {
            await userService.DeleteUserAsync(id);

            return NoContent();
        }

    }
}
