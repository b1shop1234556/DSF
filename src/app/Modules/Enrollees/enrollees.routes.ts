import { Routes } from '@angular/router';
import { ApprovepageComponent } from './approvepage/approvepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';

export const enrolleeshome: Routes = [
    {path: 'homepage', component: HomepageComponent,
        children: [
            {path: 'list', component: ListpageComponent},
            {path: 'approve', component: ApprovepageComponent},
            // {path: 'newacc/:uid', component: NewaccComponent},
            {path: '', redirectTo: 'list', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];
