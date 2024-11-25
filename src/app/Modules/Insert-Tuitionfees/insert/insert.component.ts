import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule, Router } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';
import Swal from 'sweetalert2';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [
    CommonModule,
    ViewViewComponent,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    CustomSidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    SearchFilterPipe,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(
    private conn: ConnectService,
    private route: Router
  ){}


  tuitionfee = new FormGroup({
    grade_level: new FormControl(null),
    tuition: new FormControl(null),
    general: new FormControl(null),
    esc: new FormControl(null),
    subsidy: new FormControl(null),
    req_Downpayment: new FormControl(null)
  })

  saveForm(){
    console.log(this.tuitionfee.value)
    this.conn.addtuitionfee(this.tuitionfee.value).subscribe(
      (result: any) => {
        if (result.message === 'Success') {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Work Has Been Saved",
            showConfirmButton: true,
          }).then(() => {
            this.route.navigate(['/main-page/enrollees/homepage/pending']); 
            location.reload();
          });
        } else {
          console.error('Error Occurred during save:', result);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
