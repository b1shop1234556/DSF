import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // debugger
  // const token = window.localStorage.getItem('token');

  // const cloneReq =

  return next(req);
};
