import { Injectable, signal } from '@angular/core';
import { Lesson } from '../../core/domain/Models/lesson.model';

@Injectable({ providedIn: 'root' })
export class LessonStore {
  private lessonsSignal = signal<Lesson[] | null>(null);

  getLessonsByCourseId(id: string): Lesson[] | undefined {
    return this.lessonsSignal()?.filter((lesson) => lesson.courseId === id);
  }

  getLessonById(id: string): Lesson | undefined {
    return this.lessonsSignal()?.find(lesson => lesson.id === id);
  }

  addLesson(newLesson: Lesson): void {
    this.lessonsSignal.update((lessons) => {
      if (!lessons) return [newLesson];

      return [...lessons, newLesson];
    });
  }

  updateLesson(updatedLesson: Lesson): void {
    this.lessonsSignal.update((lessons) => {
      if (!lessons) return null;

      return lessons.map((lesson) =>
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      );
    });
  }

  deleteLesson(lessonId: string): void {
    this.lessonsSignal.update((lessons) => {
      if (!lessons) return null;

      return lessons.filter((lesson) => lesson.id !== lessonId);
    });
  }

  clear(){
    this.lessonsSignal.set(null);
  }
}
