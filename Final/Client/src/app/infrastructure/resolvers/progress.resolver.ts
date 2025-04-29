import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProgressStore } from '../../data/store/progress.store';
import { UserStore } from '../../data/store/user.store';
import { ApiProgressRespository } from '../../data/repositories/api-progress.repository';
import { catchError, map, of } from 'rxjs';

export const progressResolver: ResolveFn<boolean> = () => {
  const progressStore = inject(ProgressStore);
  const userStore = inject(UserStore);

  const apiProgressRespository = inject(ApiProgressRespository);

  if(progressStore.progress()) return of(true);

  if (!userStore.user()) return of(false);

  const userId: string = userStore.user()?.id ?? '';

  console.log('User has no cached progress');

  return apiProgressRespository.getAllbyUserId(userId).pipe(
    map(() => {
      console.log('Progress loaded successfully');
      return true;
    }),
    catchError(() => {
      console.log('Error fetching progress');
      return of(true);
    })
  );
};
