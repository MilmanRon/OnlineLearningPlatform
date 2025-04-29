using API.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Data
{
    public class LearningPlatformContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Course> Courses { get; set; }

        public DbSet<Lesson> Lessons { get; set; }

        public DbSet<Progress> Progress { get; set; }

        public DbSet<Enrollment> Enrollments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>()
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<Enrollment>()
                .Property(c => c.EnrolledAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Progress>()
                .Property(c => c.WatchedAt)
                .HasDefaultValueSql("GETUTCDATE()");
        }
    }
}
