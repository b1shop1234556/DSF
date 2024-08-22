import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UploadpageComponent } from './uploadpage/uploadpage.component';

export const studenthome: Routes = [
    {path: 'home-page', component: HomePageComponent,
        children: [
            {path: 'upload', component: UploadpageComponent},
            {path: '', redirectTo: 'upload', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'home-page', pathMatch: 'full'}
];
