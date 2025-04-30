import { inject, signal } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CourseStore } from '../../data/store/course.store';
import { ApiCourseRepository } from '../../data/repositories/api-course.repository';
import { UserStore } from '../../data/store/user.store';
import { catchError, map, of } from 'rxjs';

export const coursesResolver: ResolveFn<boolean> = () => {
  const courseStore = inject(CourseStore);
  const userStore = inject(UserStore);

  const apiCourseRepository = inject(ApiCourseRepository);

  if (!userStore.user()) return of(false);

  if (courseStore.courses()) return of(true);

  console.log('User has no cached courses');

  return apiCourseRepository.getAllCourses().pipe(
    map(() => {
      console.log('Courses loaded successfully');
      return true;
    }),
    catchError(() => {
      console.log('Error fetching courses');
      return of(false);
    })
  );
};
