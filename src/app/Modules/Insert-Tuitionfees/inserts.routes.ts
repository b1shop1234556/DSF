// ./Modules/Insert-Tuitionfees/inserts.routes.ts
import { Routes } from '@angular/router';
import { InsertpageComponent } from './insertpage/insertpage.component';
import { InsertComponent } from './insert/insert.component';

export const insertshome: Routes = [
    {path: 'ins', 
        component: InsertpageComponent,
        children: [
            { path: 'inser', component: InsertComponent },
            { path: '', redirectTo: 'inser', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'ins', pathMatch: 'full' }
];