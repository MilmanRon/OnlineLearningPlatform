import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../data/store/user.store';
import { UserStorageService } from '../services/user-storage.service';

export const authGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const userLocalStorageService = inject(UserStorageService);
  const router = inject(Router);

  if (!userStore.token() && !userLocalStorageService.token()) return router.parseUrl('auth/login');

  return true;

};
