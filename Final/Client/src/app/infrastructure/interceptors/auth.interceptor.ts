import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStore } from '../../data/store/user.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(UserStore).token() ?? '';

  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(newReq);
};
