import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule, MatDialogModule],
  templateUrl: './view-view.component.html',
  styleUrl: './view-view.component.css'
})
export class ViewViewComponent implements OnInit{
  students: any;
  LRN:{ id: string | null } = {id:localStorage.getItem('LRN')}

  constructor(
    public dialogRef: MatDialogRef<ViewViewComponent>, 
    private conn: ConnectService,
    private route: Router
  ) {}
  
  ngOnInit(): void {
    console.log(this.LRN.id)
    this.conn.findtransac(this.LRN.id).subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
      
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }

  approveReceipt(id: any) {
    // Ask for confirmation about proceeding without proof of payment
    Swal.fire({
      title: 'Are you sure you want to approve without proof of payment?',
      text: 'Please confirm if you want to proceed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Proceed',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, Proceed", so proceed with the approval process
        this.conn.approveEnrollment(id).subscribe({
          next: (response) => {
            console.log('Update Successful');
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Enrollment Approved Successfully',
              showConfirmButton: true,
            }).then(() => {
              this.route.navigate(['/main-page/enrollees/homepage/approve']);
              this.dialogRef.close();
            });
          },
          error: (error) => {
            console.error('Update failed', error);
          },
        });
      } else {
        // User clicked "No, Cancel", handle the case accordingly
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Approval Cancelled',
          text: 'The approval process was cancelled.',
          showConfirmButton: true,
        }).then(() => {
          // Optionally close the dialog or take other actions
          this.dialogRef.close();
        });
      }
    });
  }
  
  
}
