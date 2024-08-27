import { Routes } from '@angular/router';
import { ApprovepageComponent } from './approvepage/approvepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';
import { ViewViewComponent } from './view-view/view-view.component';
import { RosteringComponent } from './rostering/rostering.component';

export const enrolleeshome: Routes = [
    {path: 'homepage', component: HomepageComponent,
        children: [
            {path: 'list', component: ListpageComponent},
            {path: 'approve', component: ApprovepageComponent},
            {path: 'roster', component: RosteringComponent},
            {path: 'view', component: ViewViewComponent},
            // {path: 'newacc/:uid', component: NewaccComponent},
            {path: '', redirectTo: 'list', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];
