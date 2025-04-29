import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { LessonDto } from '../dtos/lesson.dto';
import { Lesson } from '../../core/domain/Models/lesson.model';
import { $locationShim } from '@angular/common/upgrade';

@Injectable({
  providedIn: 'root',
})
export class LessonApiService {
  private path = 'lessons';
  apiClient = inject(ApiClientService);

  getLessonById(id: string): Observable<LessonDto> {
    return this.apiClient.get<LessonDto>(`${this.path}/${id}`);
  }

  createLesson(lesson: Partial<Lesson>): Observable<LessonDto> {
    return this.apiClient.post<LessonDto>(`${this.path}`, lesson);
  }

  updateLesson(lessonId: string, lesson: Partial<Lesson>): Observable<LessonDto> {
    return this.apiClient.put<LessonDto>(`${this.path}/${lessonId}`, lesson);
  }

  deleteLesson(id: string): Observable<void> {
    return this.apiClient.delete<void>(`${this.path}/${id}`);
  }
}
