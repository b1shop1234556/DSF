import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  LRN: { id: string | null } = { id: localStorage.getItem('LRN') };


  tuitionfee = new FormGroup({
    grade_level: new FormControl(null),
    tuition: new FormControl(null),
    general: new FormControl(null),
    esc: new FormControl(null),
    subsidy: new FormControl(null),
    req_Downpayment: new FormControl(null),
    LRN: new FormControl(this.LRN.id)
});

constructor(
    public dialogRef: MatDialogRef<EditfeesComponent>,
    private conn: ConnectService,
    private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
    console.log('Data received in EditfeesComponent:', data);
}

  ngOnInit(): void {
    this.showdata();
  }

  // showdata(){
  //   console.log(this.LRN.id);
  //   this.conn.findfees(this.LRN.id).subscribe((result: any) => {
  //     this.tuitions = result;
  //     console.log(this.tuitions);

  //     this.tuitionfee.patchValue({
  //       grade_level: this.tuitions.grade_level,
  //       tuition: this.tuitions.tuition,
  //       general: this.tuitions.general,
  //       esc: this.tuitions.esc,
  //       subsidy: this.tuitions.subsidy,
  //       req_Downpayment: this.tuitions.req_Downpayment,
  //     });
  //   });
  // }

  showdata() {
    if (this.data) {
        this.tuitionfee.patchValue({
            grade_level: this.data.grade_level,
            tuition: this.data.tuition,
            general: this.data.general,
            esc: this.data.esc,
            subsidy: this.data.subsidy,
            req_Downpayment: this.data.req_Downpayment,
        });
    }
}
  

//   onSubmit() {
//   const id = this.data.fee_id;  // Ensure this contains the correct fee_id
//   console.log('fee_id being sent:', id);

//   if (!id) {
//     console.error("ID is not defined!");
//     return;
//   }

//   const data = this.tuitionfee.value;  // Get the updated values from the form controls
//   console.log('Sending data to update:', data);  // Check if the data contains the updated values

//   // Call the updateTuitionFee method with both id and data
//   this.conn.updateTuitionFee(id, data).subscribe(
//     (result: any) => {
//       if (result.message === 'Tuition fee updated successfully') {
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Your Work Has Been Saved",
//           showConfirmButton: true,
//         }).then(() => {
//           this.dialogRef.close();
//           this.showdata();
//         });
//       } else {
//         console.error('Unexpected response:', result);
//       }
//     },
//     (error) => {
//       console.error('Error:', error);
//     }
//   );
// }





  //  onCancel (): void {

  onSubmit(): void {
    if (this.tuitionfee.valid) {
        const formData = {
            fee_id: this.data.fee_id, // Include fee_id from data
            grade_level: this.tuitionfee.value.grade_level,
            tuition: this.tuitionfee.value.tuition,
            general: this.tuitionfee.value.general,
            esc: this.tuitionfee.value.esc,
            subsidy: this.tuitionfee.value.subsidy,
            req_Downpayment: this.tuitionfee.value.req_Downpayment,
        };

        Swal.fire({
            title: 'Success!',
            text: 'Section updated successfully!',
            icon: 'success'
        });

        console.log('Form Data:', JSON.stringify(formData, null, 2));
        this.dialogRef.close(formData); // Return updated values including fee_id
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all required fields.',
            icon: 'error'
        });
    }
}

  
    onCancel (): void {
      this.dialogRef.close() // Close the dialog without saving
    }

}
