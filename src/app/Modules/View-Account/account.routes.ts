import { Routes } from '@angular/router';
import { AccHomepageComponent } from './acc-homepage/acc-homepage.component';
import { EditInfoComponent } from './edit-info/edit-info.component';
import { ViewMessagesComponent } from './view-messages/view-messages.component';

export const accounthome: Routes = [
    {path: 'acc-homepage', component: AccHomepageComponent,
        children: [
            {path: 'acc', component: EditInfoComponent},
            {path: 'msg', component: ViewMessagesComponent},
            {path: '', redirectTo: 'acc', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'acc-homepage', pathMatch: 'full'}
];
