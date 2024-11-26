import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
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
import { RouterOutlet, RouterLinkActive, RouterLink, RouterModule, Router } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';
import Swal from 'sweetalert2';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-editfees',
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
  templateUrl: './editfees.component.html',
  styleUrl: './editfees.component.css'
})
export class EditfeesComponent implements OnInit{

  
  tuitions: any;
  fee_id: { id: string | null } = { id: localStorage.getItem('fee_id') };


  tuitionfee = new FormGroup({
    grade_level: new FormControl(null),
    tuition: new FormControl(null),
    general: new FormControl(null),
    esc: new FormControl(null),
    subsidy: new FormControl(null),
    req_Downpayment: new FormControl(null),
    LRN: new FormControl(this.fee_id.id)
  });

  constructor(
    // public dialogRef: MatDialogRef<InputPaymentComponent>,
    private conn: ConnectService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.showdata();
  }

  showdata(){
    console.log(this.fee_id.id);
    this.conn.findfees(this.fee_id.id).subscribe((result: any) => {
      this.tuitions = result;
      console.log(this.tuitions);

      this.tuitionfee.patchValue({
        grade_level: this.tuitions.grade_level,
        tuition: this.tuitions.tuition,
        general: this.tuitions.general,
        esc: this.tuitions.esc,
        subsidy: this.tuitions.subsidy,
        req_Downpayment: this.tuitions.req_Downpayment,
      });
    });
  }

  // saveForm(){
  //   console.log(this.tuitionfee.value)
  //   this.conn.addtuitionfee(this.tuitionfee.value).subscribe(
  //     (result: any) => {
  //       if (result.message === 'Success') {
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "Your Work Has Been Saved",
  //           showConfirmButton: true,
  //         }).then(() => {
  //           this.route.navigate(['/main-page/inserts/ins/tuidis']); 
  //           location.reload();
  //         });
  //       } else {
  //         console.error('Error Occurred during save:', result);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

}
