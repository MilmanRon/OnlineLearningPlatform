import { HttpInterceptorFn } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { UserStore } from '../../data/store/user.store';
import { UserStorageService } from '../services/user-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore);
  const userLocalStorageService = inject(UserStorageService);

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userStore.token() ?? userLocalStorageService.token()}`),
  });

  return next(newReq);
};


