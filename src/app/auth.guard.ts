import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// import { routes } from './app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && window.localStorage) {
    const localData = localStorage.getItem('token');
    if (localData != null) {
      return true;
    }
  }
  router.navigateByUrl('/login-page/login');
  return false;
};

