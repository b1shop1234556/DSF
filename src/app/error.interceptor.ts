import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  // debugger;
  
  // const router =inject(Router);

  // return next(req).pipe(catchError((err:any)=>{
  //   if([401, 403].includes(JSON.parse(err.status))){
  //     router.navigate(['login']);
  //   }

  //   const e = err.error.status || err.statusText

  //   return throwError(()=>e);
  // }))

  return next(req);
};
