﻿using API.Domain.Entities;
using API.Domain.Repositories;
using API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class LessonRepository(LearningPlatformContext context) : ILessonRepository
    {
        public async Task<Lesson> AddLessonAsync(Lesson lesson)
        {
            if (lesson == null)
                throw new ArgumentNullException(nameof(lesson));

            await context.Lessons.AddAsync(lesson);
            await context.SaveChangesAsync();

            return lesson;
        }

        public async Task DeleteLessonAsync(Guid id)
        {
            var lesson = await context.Lessons.FindAsync(id);

            if (lesson == null)
                throw new EntityNotFoundException(nameof(Lesson), id);

            context.Lessons.Remove(lesson);
            await context.SaveChangesAsync();
        }

        public async Task<Lesson> GetLessonByIdAsync(Guid id)
        {
            var lesson = await context.Lessons
                .Include(l => l.Course)
                .SingleOrDefaultAsync(l => l.Id == id);

            if (lesson == null)
                throw new EntityNotFoundException(nameof(Lesson), id);

            return lesson;
        }

        public async Task<Lesson> UpdateLessonAsync(Lesson lesson)
        {
            if (lesson == null)
                throw new ArgumentNullException(nameof(lesson));

            var currentLesson = await context.Lessons.FindAsync(lesson.Id);

            if (currentLesson == null)
                throw new EntityNotFoundException(nameof(User), lesson.Id);

            currentLesson.Title = lesson.Title;
            currentLesson.VideoUrl = lesson.VideoUrl;

            await context.SaveChangesAsync();

            return currentLesson;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await context.Lessons.AnyAsync(l => l.Id == id);
        }

        public async Task<bool> HasLessonNameAsync(string name)
        {
            return await context.Lessons.AnyAsync(l => l.Title == name);
        }
    }
}
