import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatDialog } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { InsertComponent } from '../insert/insert.component';
import { EditfeesComponent } from '../editfees/editfees.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tuitiodis',
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
  templateUrl: './tuitiodis.component.html',
  styleUrl: './tuitiodis.component.css'
})
export class TuitiodisComponent implements OnInit{

  enrollments: any;
  
  keyword: any;
  students: any;
  grade: any;

  fee_id: any;

  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private route: Router,
    private conn: ConnectService
  ) {}

  // Modal(id: any): void {
  //   console.log(id);
  //   this.dialog.open(EditfeesComponent, {
  //       width: '530px',  // Fixed width
  //       height: '530px', // Fixed height
  //       maxWidth: '800px',
  //       maxHeight: '800px',
        
  //   });
  // }

  Modal(c: any): void {
    console.log('Opening dialog with data:', c); // Log the data to ensure it contains fee_id
    const dialogRef = this.dialog.open(EditfeesComponent, {
        width: '530px',
        data: c // Ensure c has fee_id
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.Update(result); // Pass the result to Update
            console.log('Data passed to dialog:', result);
        }
    });
}

Update(result: any): void {
  const id = result.fee_id; // Get fee_id
  if (!id) {
      console.error('No fee_id provided for update');
      return; // Exit if fee_id is missing
  }

  const data = {
      grade_level: result.grade_level,
      tuition: result.tuition,
      general: result.general,
      esc: result.esc,
      subsidy: result.subsidy,
      req_Downpayment: result.req_Downpayment,
  };

  this.conn.updateTuitionFee(id, data).subscribe(
      response => {
          console.log('Update successful:', response);
          // Optionally, show a success message or refresh data
      },
      error => {
          console.error('Update failed:', error);
          // Optionally, show an error message
      }
  );
  this.displaypending()
}

// OpenModal(id: any): void {
//   console.log(id);
//   localStorage.setItem('fee_id', id);
//   this.dialog.open(InsertComponent, {
//       width: '530px',  // Fixed width
//       height: '520px', // Fixed height
//       maxWidth: '800px',
//       maxHeight: '800px',
//   });
// }


  ngOnInit(): void {
    this.displaypending()
    // tuitiondisplay
  }

  displaypending() {
    this.conn.tuitiondisplay().subscribe((result: any) => {
        // Directly assign the result to the students variable
        this.students = result;
        console.log(this.students);
    });
}

onDelete(fee_id: number): void {
  // Show SweetAlert confirmation dialog
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this tuition fee.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the delete function with the fee_id
      this.conn.deleteTuitionFee(fee_id).subscribe(
        (response: any) => {
          // Handle successful deletion response
          if (response.message === 'Tuition fee deleted successfully') {
            console.log('Delete successful:', response);
            Swal.fire(
              'Deleted!',
              'The tuition fee has been deleted.',
              'success'
            );
            this.displaypending(); // Refresh the list of students/fees
          } else {
            console.error('Delete failed:', response);
            Swal.fire(
              'Failed!',
              'There was an issue deleting the tuition fee. Please try again later.',
              'error'
            );
          }
        },
        (error) => {
          console.error('Delete failed:', error);
          Swal.fire(
            'Failed!',
            'There was an issue deleting the tuition fee. Please try again later.',
            'error'
          );
        }
      );
    }
  });
}



}
