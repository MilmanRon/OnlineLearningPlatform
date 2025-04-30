import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApiUserRepository } from '../../data/repositories/api-user.repository';
import { UserStore } from '../../data/store/user.store';
import { UserStorageService } from '../services/user-storage.service';
import { catchError, map, of } from 'rxjs';

export const userResolver: ResolveFn<boolean> = () => {
  const userStore = inject(UserStore);
  const userLocalStorageService = inject(UserStorageService);
  const apiUserRepository = inject(ApiUserRepository);

  if (userStore.user()) return of(true);

  if (!userLocalStorageService.currentUserFromLocalStorage()) return of(false);

  return apiUserRepository.get(userLocalStorageService.userId() ?? '').pipe(
    map(() => {
      console.log(userStore.user());
      return true;
    }),
    catchError(() => {
      console.log('Error getting user');
      return of(false);
    })
  );
};
