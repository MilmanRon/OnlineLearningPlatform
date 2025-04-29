import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../../data/store/user.store';
import { Role } from '../../core/domain/Models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userStore = inject(UserStore);

  const requiredRole = route.data['role'] as Role;

  if (userStore.user()?.role === requiredRole) return true;

  return router.parseUrl('/unauthorized');
};
