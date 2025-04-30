import { Observable } from 'rxjs';
import { Lesson } from '../Models/lesson.model';

export interface LessonRepository {
  create(lesson: Omit<Lesson, 'id'>): Observable<Lesson>;
  update(id: string, lesson: Partial<Lesson>): Observable<Lesson>;
  delete(courseId: string, lessonId: string): Observable<void>;
}
