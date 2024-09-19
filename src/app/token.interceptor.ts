import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';
  if (typeof window !== 'undefined' && window.localStorage) {
    token = window.localStorage.getItem('token') || '';
  }

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloneReq);
};

