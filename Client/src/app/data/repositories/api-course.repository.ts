import { inject, Injectable } from '@angular/core';
import { CourseRepository } from '../../core/domain/repositories/course-repository.interface';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../../core/domain/Models/course.model';
import { CourseApiService } from '../api/course-api.service';
import { CourseMapper } from '../mappers/course.mapper';
import { CourseStore } from '../store/course.store';

@Injectable()
export class ApiCourseRepository implements CourseRepository {
  private courseApiService = inject(CourseApiService);
  private courseStore = inject(CourseStore);
  private courseMapper = inject(CourseMapper);

  getAllCourses(): Observable<Course[]> {
    return this.courseApiService.getCourses().pipe(
      map((coursesDto) =>
        coursesDto.map((courseDto) => this.courseMapper.toDomain(courseDto))
      ),
      tap((courses) => this.courseStore.setCourses(courses))
    );
  }

  getById(id: string): Observable<Course> {
    return this.courseApiService.getCourseById(id).pipe(
      map((courseDto) => this.courseMapper.toDomain(courseDto)),
      tap((course) => this.courseStore.updateCourse(course))
    );
  }

  create(course: Omit<Course, 'id' | 'createdAt'>): Observable<Course> {
    return this.courseApiService.createCourse(course).pipe(
      map((courseDto) => this.courseMapper.toDomain(courseDto)),
      tap((course) => this.courseStore.addCourse(course))
    );
  }
  update(courseId: string, course: Partial<Course>): Observable<Course> {
    return this.courseApiService.updateCourse(courseId, course).pipe(
      map((courseDto) => this.courseMapper.toDomain(courseDto)),
      tap((course) => this.courseStore.updateCourse(course))
    );
  }

  delete(courseId: string): Observable<void> {
    return this.courseApiService.deleteCourse(courseId).pipe(
      tap(() => {
        this.courseStore.deleteCourse(courseId);
      })
    );
  }
}
