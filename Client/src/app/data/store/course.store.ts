import { inject, Injectable, signal } from '@angular/core';
import { Course } from '../../core/domain/Models/course.model';
import { LessonStore } from './lesson.store';
import { Lesson } from '../../core/domain/Models/lesson.model';

@Injectable({ providedIn: 'root' })
export class CourseStore {
  private coursesSignal = signal<Course[] | null>(null);

  readonly courses = this.coursesSignal.asReadonly();

  setCourses(courses: Course[]): void {
    this.coursesSignal.set(courses);
  }

  getCourseById(id: string): Course | undefined {
    const course = this.coursesSignal()?.find((course) => course.id === id);
    if (!course) return undefined;
    return course;
  }

  addCourse(newCourse: Course): void {
    this.coursesSignal.update((courses) => {
      if (!courses) return [newCourse];

      return [...courses, newCourse];
    });
  }

  updateCourse(updatedCourse: Course): void {
    this.coursesSignal.update((courses) => {
      if (!courses) return null;

      return courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      );
    });
  }

  deleteCourse(courseId: string): void {
    this.coursesSignal.update((courses) => {
      if (!courses) return null;

      return courses.filter((course) => course.id !== courseId);
    });
  }

  getLesson(courseId: string, lessonId: string): Lesson | undefined {
    const course = this.getCourseById(courseId);
    if (!course) return undefined;

    return course.lessons.find((lesson) => lesson.id === lessonId);
  }

  addLesson(newLesson: Lesson): void {
    const course = this.getCourseById(newLesson.courseId);
    if (!course) return;

    course?.lessons.push(newLesson);
  }

  updateLesson(updatedLesson: Lesson): void {
    const course = this.getCourseById(updatedLesson.courseId);
    if (!course) return;

    const updatedLessons = course.lessons.map((lesson) =>
      lesson.id === updatedLesson.id ? updatedLesson : lesson
    );

    this.updateCourse({
      ...course,
      lessons: updatedLessons,
    });
  }

  deleteLesson(courseId: string, lessonId: string): void {
    const course = this.getCourseById(courseId);
    if (!course) return;

    const updatedLessons = course.lessons.filter(
      (lesson) => lesson.id !== lessonId
    );

    if (updatedLessons.length !== course.lessons.length) {
      this.updateCourse({
        ...course,
        lessons: updatedLessons,
      });
    }
  }

  clear(): void {
    this.coursesSignal.set(null);
  }
}
