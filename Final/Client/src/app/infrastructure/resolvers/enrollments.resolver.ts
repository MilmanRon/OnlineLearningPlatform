import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EnrollmentStore } from '../../data/store/enrollment.store';
import { UserStore } from '../../data/store/user.store';
import { ApiEnrollmentRepository } from '../../data/repositories/api-enrollment.repository';
import { catchError, map, of } from 'rxjs';

export const enrollmentsResolver: ResolveFn<boolean> = () => {
  const enrollmentStore = inject(EnrollmentStore);
  const userStore = inject(UserStore);

  const apiEnrollmentRepository = inject(ApiEnrollmentRepository);

  if (enrollmentStore.enrollments()) return of(true);

  if (!userStore.user()) return of(false);

  const userId: string = userStore.user()?.id ?? '';

  console.log('User has no cached enrollments');

  return apiEnrollmentRepository.getAllEnrollmentsbyUserId(userId).pipe(
    map(() => {
      console.log('Enrollments loaded successfully');
      return true;
    }),
    catchError(() => {
      console.log('Error fetching enrollments');
      return of(false);
    })
  );
};
