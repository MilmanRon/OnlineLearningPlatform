﻿using API.Application.DTOs.Course;
using API.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CoursesController(ICourseService courseService) : BaseApiController
    {

        [HttpPost]
        public async Task<ActionResult> AddCourse(AddCourseDto addCourseDto)
        {
            return Ok(await courseService.AddCourseAsync(addCourseDto));

        }

        [HttpGet]
        public async Task<ActionResult> GetCourses()
        {
            return Ok(await courseService.GetAllCoursesAsync());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult> GetCourseById(Guid id)
        {
            return Ok(await courseService.GetCourseByIdAsync(id));
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> UpdateCourse(UpdateCourseDto updateCourseDto, Guid id)
        {
            updateCourseDto.Id = id;
            return Ok(await courseService.UpdateCourseAsync(updateCourseDto));
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult> DeleteCourse(Guid id)
        {
            await courseService.DeleteCourseAsync(id);

            return NoContent();
        }
    }
}
