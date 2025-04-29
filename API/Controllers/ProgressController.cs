using API.Application.DTOs.Progress;
using API.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProgressController(IProgressService progressService) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddProgress(AddProgressDto addProgressDto)
        {
            return Ok(await progressService.AddProgressAsync(addProgressDto));
        } 

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetProgressById(Guid id)
        {
            return Ok(await progressService.GetProgressByIdAsync(id));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteProgress(Guid id)
        {
            await progressService.DeleteProgressAsync(id);

            return NoContent();
        }
    }
}
