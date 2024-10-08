import { Routes } from '@angular/router';
import { ApprovepageComponent } from './approvepage/approvepage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListpageComponent } from './listpage/listpage.component';
import { ViewViewComponent } from './view-view/view-view.component';
import { InputPaymentComponent } from './input-payment/input-payment.component';
// import { ViewDetailsComponent } from './view-details/view-details.component';

export const enrolleeshome: Routes = [
    {path: 'homepage', component: HomepageComponent,
        children: [
            {path: 'pending', component: ApprovepageComponent},
            {path: 'approve', component: ListpageComponent},
            {path: 'view', component: ViewViewComponent},
            { path: 'input', component: InputPaymentComponent },
            // {path: 'viewdetails', component: ViewDetailsComponent},
            // {path: 'newacc/:uid', component: NewaccComponent},
            {path: '', redirectTo: 'pending', pathMatch: 'full'}
        ]
    },
    {path: '', redirectTo: 'homepage', pathMatch: 'full'}
];
