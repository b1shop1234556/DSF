import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { ViewViewComponent } from '../view-view/view-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../../post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approvepage',
  standalone: true,
  imports: [
    ViewViewComponent,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatListModule
  ],
  templateUrl: './approvepage.component.html',
  styleUrls: ['./approvepage.component.css'] // Corrected this to styleUrls
})
export class ApprovepageComponent {
  student: any;

  constructor(
    private dialog: MatDialog,
    private conn: PostService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.conn.getstudent().subscribe((result: any) => {
      this.student = result;
    });
  }

  modals() {
    Swal.fire({
      title: "Official Receipt",
      html: `
        <div class="receipt-container">
          <p><strong>Date:</strong> 2023-09-01</p>
          <p><strong>Received From:</strong> Maria Clara</p>
          <p><strong>Address:</strong> [Insert Address Here]</p>
          <div class="receipt-details">
              <p><strong>LRN:</strong> 1234567890</p>
              <p><strong>Grade Level:</strong> Grade 11</p>
              <p><strong>Enrollment Date:</strong> 2023-08-20</p>
              <p><strong>Tuition:</strong> ₱40,000</p>
              <p><strong>Payment:</strong> ₱10,000</p>
              <p class="total"><strong>Balance:</strong> ₱30,000</p>
              <p style="font-weight: bold;">Total Amount Paid: Ten Thousand Pesos Only (₱10,000)</p>
              <p><strong>Payment Method:</strong> Cash</p>
          </div>
          <div class="footer">
              <p>Thank you for your payment!</p>
              <p>For any inquiries, please contact us.</p>
              <p style="margin-top: 40px;">______________________</p>
              <p>Authorized Signature</p>
          </div>
        </div>
      `,
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      },
      confirmButtonText: "Close",
      width: '600px',
      padding: '20px',
      customClass: {
        container: 'swal-wide-container'
      }
    });
  }

  views(){
    Swal.fire({
      title: "View Details",
      html: `
        <div class="receipt-container">
          <p><strong>Date:</strong> 2023-09-01</p>
          <p><strong>Received From:</strong> Maria Clara</p>
          <p><strong>Address:</strong> [Insert Address Here]</p>
          <div class="receipt-details">
            <p><strong>LRN:</strong> 1234567890</p>
            <p><strong>Contact No.:</strong> 09123456789</p>
            <p><strong>Grade Level:</strong> Grade 11</p>
            <p><strong>Subjects:</strong> Mathematics, Science, English</p>
            <p><strong>Term:</strong> 1st Semester</p>
            <p><strong>Date Filed:</strong> 2023-08-20</p>
            <p><strong>Day of Payment:</strong> 2023-09-01</p>
            <p><strong>Tuition:</strong> ₱40,000</p>
            <p><strong>Payment:</strong> ₱10,000</p>
            <p class="total"><strong>Balance:</strong> ₱30,000</p>
            <p style="font-weight: bold;">Total Amount Paid: Ten Thousand Pesos Only (₱10,000)</p>
            <p><strong>Payment Method:</strong> Cash</p>
          </div>
          <div class="footer">
            <p>Thank you for your payment!</p>
            <p>For any inquiries, please contact us.</p>
            <p style="margin-top: 40px;">______________________</p>
            <p>Authorized Signature</p>
          </div>
        </div>
      `,  
      showClass: {
        popup: 'animate__animated animate__fadeInUp animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown animate__faster'
      },
      confirmButtonText: "Print",
      width: '600px',
      padding: '20px',
      customClass: {
        container: 'swal-wide-container'
      }
    });
  }

  //   Swal.fire({
  //     title: 'View Details',
  //     showConfirmButton: false,
  //     showCloseButton: true,
  //     customClass: {
  //       container: 'swal-wide-container',
  //       popup: 'receipt-popup',
  //       header: 'receipt-header',
  //       title: 'receipt-title',
  //       closeButton: 'receipt-close-button',
  //       content: 'receipt-content',
  //       actions: 'receipt-actions',
  //       footer: 'receipt-footer'
  //     },
  //     width: '80%',
  //     maxWidth: '800px'
  //   });
  // }

  // Uncomment and use if you need to open a dialog
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(ViewViewComponent, {
  //     height: '800px',
  //     width: '500px'
  //   });
  // }
}
