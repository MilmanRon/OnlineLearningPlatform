using API.Application.DTOs.Enrollment;
using API.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EnrollmentController(IEnrollmentService enrollmentService) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddEnrollment(AddEnrollmentDto addEnrollmentDto)
        {
            return Ok(await enrollmentService.AddEnrollmentAsync(addEnrollmentDto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteEnrollment(Guid id)
        {
            await enrollmentService.DeleteEnrollmentAsync(id);

            return NoContent();
        }



    }
}
