import { CanActivate, CanActivateFn, Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { enrolleeshome } from './Modules/Enrollees/enrollees.routes';
import { studenthome } from './Modules/Student-Account/student.routes';
import { accounthome } from './Modules/View-Account/account.routes';
import { authGuard } from './auth.guard';
import { inject } from '@angular/core';
import { insertshome } from './Modules/Insert-Tuitionfees/inserts.routes';
// import { insertshome } from './Modules/Insert-Tuitionfees/inserts.routes';

export const loginGuard: CanActivateFn = (route, state) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localData = localStorage.getItem('token');
      if (localData != null) {
        inject(Router).navigateByUrl('/main-page');
        return false;
      }
    }
    return true;
  };
  

export const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate:[loginGuard]
        // children: [
        //     {path:'login', component: LoginComponent, canActivate:[loginGuard]},
        //     // {path:'sign', component: SignComponent},
        //     {path: '', redirectTo: 'login', pathMatch:'full'}
        // ]
    },
    {path: 'main-page', component: MainPageComponent, canActivate:[authGuard],
    children: [
        {
            path: 'enrollees',
            loadChildren: () => import('./Modules/Enrollees/enrollees.routes').then(r=>enrolleeshome),
          
        },
        {
            path: 'student',
            loadChildren: () => import('./Modules/Student-Account/student.routes').then(r=>studenthome),
           
        },
        {
            path: 'account',
            loadChildren: () => import('./Modules/View-Account/account.routes').then(r=>accounthome),
           
        },
        {
            path: 'inserts',
            loadChildren: () => import('./Modules/Insert-Tuitionfees/inserts.routes').then(r => insertshome),
           
        },


        {path: '', redirectTo: 'enrollees', pathMatch: 'full'}
    
        ]
    },
    
    // {path: '', redirectTo: 'main-page', pathMatch: 'full'}
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];