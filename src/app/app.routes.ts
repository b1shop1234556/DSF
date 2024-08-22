import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { enrolleeshome } from './Modules/Enrollees/enrollees.routes';
import { studenthome } from './Modules/Student-Account/student.routes';
import { accounthome } from './Modules/View-Account/account.routes';


export const routes: Routes = [
    {path: 'login-page', component: LoginPageComponent,
    children: [
        {path:'login', component: LoginComponent},
        // {path:'sign', component: SignComponent},
        {path: '', redirectTo: 'login', pathMatch:'full'}
    ]
    },
    {path: 'main-page', component: MainPageComponent,
    children: [
        {
            path: 'enrollees',
            loadChildren: () => import('./Modules/Enrollees/enrollees.routes').then(r=>enrolleeshome)
        },
        {
            path: 'student',
            loadChildren: () => import('./Modules/Student-Account/student.routes').then(r=>studenthome)
        },
        {
            path: 'account',
            loadChildren: () => import('./Modules/View-Account/account.routes').then(r=>accounthome)
        },


        {path: '', redirectTo: 'enrollees', pathMatch: 'full'}
    
        ]
    },
    
    // {path: '', redirectTo: 'main-page', pathMatch: 'full'}
    {path: '', redirectTo: 'login-page', pathMatch: 'full'}
];