using API.Application.DTOs.Course;
using API.Application.DTOs.Enrollment;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class EnrollmentService(IEnrollmentRepository enrollmentRepository, IMapper mapper) : IEnrollmentService
    {
        public async Task<EnrollmentResponseDto> AddEnrollmentAsync(AddEnrollmentDto addEnrollmentDto)
        {
            if (addEnrollmentDto == null)
                throw new ArgumentNullException();

            if(await enrollmentRepository.HasEnrollmentAsync(addEnrollmentDto.CourseId))
                throw new InvalidOperationException($"Enrollment already exists.");

            var enrollmentDb = await enrollmentRepository.AddEnrollmentAsync(mapper.Map<Enrollment>(addEnrollmentDto));

            return mapper.Map<EnrollmentResponseDto>(enrollmentDb);
        }

        public async Task DeleteEnrollmentAsync(Guid id)
        {
            await enrollmentRepository.DeleteEnrollmentAsync(id);
        }
    }
}
