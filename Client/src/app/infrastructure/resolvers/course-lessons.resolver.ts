import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserStore } from '../../data/store/user.store';
import { CourseStore } from '../../data/store/course.store';
import { catchError, map, of } from 'rxjs';
import { ApiCourseRepository } from '../../data/repositories/api-course.repository';

export const courseLessonsResolver: ResolveFn<boolean> = (route) => {
    const userStore = inject(UserStore);
    const courseStore = inject(CourseStore);

    const apiCourseRepository = inject(ApiCourseRepository);

    const courseId = route.paramMap.get('courseId');
    const course = courseStore.getCourseById(courseId!);

    if(!userStore.user()) return of(false);

    if(!course) return of(false);

    if(course.lessons.length > 0) return of(true);

    return apiCourseRepository.getById(courseId!).pipe(
        map(() => {
            console.log('Course with lesson loaded successfully');
            return true;            
        }),
        catchError(() => {
            console.log('Error fetching course');
            return of(false);
        })
    )

};
