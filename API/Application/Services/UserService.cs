using API.Application.DTOs.Course;
using API.Application.DTOs.Enrollment;
using API.Application.DTOs.Progress;
using API.Application.DTOs.User;
using API.Application.Interfaces;
using API.Domain.Entities;
using API.Domain.Repositories;
using AutoMapper;

namespace API.Application.Services
{
    public class UserService(IUserRepository userRepository, ICourseRepository courseRepository, IMapper mapper) : IUserService
    {

        public async Task<UserResponseDto> GetUserByIdAsync(Guid id)
        {
            var userDb = await userRepository.GetUserByIdAsync(id);

            return mapper.Map<UserResponseDto>(userDb);
        }


        public async Task<UserResponseDto> UpdateUserAsync(UpdateUserDto updatedUserDto)
        {
            if(updatedUserDto is null)
                throw new ArgumentNullException();

            var userToUpdate = await userRepository.GetUserByIdAsync(updatedUserDto.Id);

            if(userToUpdate.Email == updatedUserDto.Email)
            {
                var updatedUser = await userRepository.UpdateUserAsync(mapper.Map<User>(updatedUserDto));
                return mapper.Map<UserResponseDto>(updatedUser);
            }

            if(!await userRepository.HasUserWithEmailAsync(updatedUserDto.Email))
            {
                var updatedUser = await userRepository.UpdateUserAsync(mapper.Map<User>(updatedUserDto));
                return mapper.Map<UserResponseDto>(updatedUser);
            }

            throw new InvalidOperationException($"User with email '{updatedUserDto.Email}' already exists.");
        }


        public async Task DeleteUserAsync(Guid id)
        {
            await userRepository.DeleteUserAsync(id);
        }

        public async Task<List<EnrollmentResponseDto>> GetUserEnrollments(Guid id)
        {
            var userEnrollments = await userRepository.GetUserEnrollmentsAsync(id);

            return userEnrollments.Select(e => mapper.Map<EnrollmentResponseDto>(e)).ToList();

        }

        public async Task<List<ProgressResponseDto>> GetUserProgress(Guid id)
        {
            var userProgress = await userRepository.GetUserProgressAsync(id);

            return userProgress.Select(p => mapper.Map<ProgressResponseDto>(p)).ToList();

        }

        public async Task<EnrollmentResponseDto> EnrollUser(AddEnrollmentDto addEnrollmentDto, Guid id)
        {
            if (!await courseRepository.HasCourseAsync(addEnrollmentDto.CourseId))
                throw new KeyNotFoundException($"Course with ID '{id}' was not found.");

            if (await userRepository.isAlreadyEnrolledAsync(addEnrollmentDto.CourseId, id))
                throw new InvalidOperationException($"User already enrolled to course: {addEnrollmentDto.CourseId}");

            addEnrollmentDto.UserId = id;

            var enrollmentDb = await userRepository.EnrollUserAsync(mapper.Map<Enrollment>(addEnrollmentDto), id);

            return mapper.Map<EnrollmentResponseDto>(enrollmentDb);

        }

        public async Task<ProgressResponseDto> AddProgress(AddProgressDto addProgressDto, Guid id)
        {
            if(!await userRepository.isExistsAsync(id))
                throw new KeyNotFoundException($"User with ID '{id}' was not found.");

            if (await userRepository.hasProgressAsync(addProgressDto.LessonId, id))
                throw new InvalidOperationException($"User already has progress in lesson: {addProgressDto.LessonId}");

            addProgressDto.UserId = id;

            var progressDb = await userRepository.AddProgressAsync(mapper.Map<Progress>(addProgressDto), id);

            return mapper.Map<ProgressResponseDto>(progressDb);
        }


    }
}
