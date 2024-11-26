// ./Modules/Insert-Tuitionfees/inserts.routes.ts
import { Routes } from '@angular/router';
import { InsertpageComponent } from './insertpage/insertpage.component';
import { InsertComponent } from './insert/insert.component';
import { TuitiodisComponent } from './tuitiodis/tuitiodis.component';
import { EditfeesComponent } from './editfees/editfees.component';

export const insertshome: Routes = [
    {path: 'ins', 
        component: InsertpageComponent,
        children: [
            { path: 'tuidis', component: TuitiodisComponent },
            { path: 'editfee', component: EditfeesComponent },
            { path: 'inser', component: InsertComponent },
            { path: '', redirectTo: 'tuidis', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'ins', pathMatch: 'full' }
];