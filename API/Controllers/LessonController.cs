using API.Application.DTOs.Lesson;
using API.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LessonsController(ILessonService lessonService) : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddLesson(AddLessonDto addLessonDto)
        {
            return Ok(await lessonService.AddLessonAsync(addLessonDto));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetLessonById(Guid id)
        {
            return Ok(await lessonService.GetLessonByIdAsync(id));
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateLesson(UpdateLessonDto updateLessonDto, Guid id)
        {
            updateLessonDto.Id = id;
            return Ok(await lessonService.UpdateLessonAsync(updateLessonDto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteLesson(Guid id)
        {
            await lessonService.DeleteLessonAsync(id);

            return NoContent();
        }

    }
}
