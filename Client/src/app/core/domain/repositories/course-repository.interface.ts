import { Observable } from 'rxjs';
import { Course } from '../Models/course.model';

export interface CourseRepository {
  getAllCourses(): Observable<Course[]>;
  getById(id: string): Observable<Course>;
  create(course: Omit<Course, 'id' | 'createdAt'>): Observable<Course>;
  update(id: string, course: Partial<Course>): Observable<Course>;
  delete(id: string): Observable<void>;
}
