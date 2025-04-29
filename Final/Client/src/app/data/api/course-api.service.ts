import { inject, Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { CourseDto } from '../dtos/course.dto';
import { Course } from '../../core/domain/Models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  private path = 'courses';
  apiClient = inject(ApiClientService);

  getCourses(): Observable<CourseDto[]> {
    return this.apiClient.get<CourseDto[]>(`${this.path}`);
  }

  getCourseById(id: string): Observable<CourseDto> {
    return this.apiClient.get<CourseDto>(`${this.path}/${id}`);
  }

  createCourse(course: Partial<Course>): Observable<CourseDto> {
    return this.apiClient.post<CourseDto>(`${this.path}`, course);
  }

  updateCourse(courseId: string, course: Partial<Course>): Observable<CourseDto> {
    return this.apiClient.put<CourseDto>(`${this.path}/${courseId}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.apiClient.delete<void>(`${this.path}/${id}`);
  }
}
