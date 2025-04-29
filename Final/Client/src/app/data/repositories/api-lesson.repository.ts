import { inject, Injectable } from '@angular/core';
import { LessonRepository } from '../../core/domain/repositories/lesson-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { Lesson } from '../../core/domain/Models/lesson.model';
import { LessonApiService } from '../api/lesson-api.service';
import { LessonMapper } from '../mappers/lesson.mapper';
import { LessonStore } from '../store/lesson.store';
import { CourseStore } from '../store/course.store';

@Injectable()
export class ApiLessonRepository implements LessonRepository {
  private lessonApiService = inject(LessonApiService);
  private lessonMapper = inject(LessonMapper);
  private courseStore = inject(CourseStore);

  create(lesson: Omit<Lesson, 'id' | 'isCompleted'>): Observable<Lesson> {
    return this.lessonApiService.createLesson(lesson).pipe(
      map((lessonDto) => this.lessonMapper.toDomain(lessonDto)),
      tap((lesson) => this.courseStore.addLesson(lesson))
    );
  }

  update(lessonId: string, lesson: Partial<Lesson>): Observable<Lesson> {
    return this.lessonApiService.updateLesson(lessonId, lesson).pipe(
      map((lessonDto) => this.lessonMapper.toDomain(lessonDto)),
      tap((lesson) => this.courseStore.updateLesson(lesson))
    );
  }
  delete(courseId: string, lessonId: string): Observable<void> {
    return this.lessonApiService
      .deleteLesson(lessonId)
      .pipe(tap(() => this.courseStore.deleteLesson(courseId, lessonId)));
  }
}
