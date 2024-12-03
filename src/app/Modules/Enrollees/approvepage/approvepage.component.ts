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
// import { PostService } from '../../../post.service';
// import Swal from 'sweetalert2';
import { ConnectService } from '../../../connect.service';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { InputPaymentComponent } from '../input-payment/input-payment.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approvepage',
  standalone: true,
  imports: [
    CommonModule,
    ViewViewComponent,
    RouterLink,
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
  templateUrl: './approvepage.component.html',
  styleUrls: ['./approvepage.component.css'] // Corrected this to styleUrls
})
export class ApprovepageComponent {

  enrollments: any;
  
  keyword: any;
  students: any;
  grade: any;

  currentDate: Date = new Date();
  // intervalId: any;


  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private route: Router,
    private conn: ConnectService
  ) {}

//   openModal(id: any): void {
//     console.log(id);
//     localStorage.setItem('LRN', id);
//     this.dialog.open(ViewViewComponent, {
//         width: '530px',  // Fixed width
//         height: '520px', // Fixed height
//         maxWidth: '800px',
//         maxHeight: '800px',
//     });
// }

  Modal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    this.displaypending();
    this.dialog.open(InputPaymentComponent, {
        width: '920px',  // Fixed width
        height: '528px', // Fixed height
        maxWidth: '2000px',
        maxHeight: '2000px',
    });
  }

  ngOnInit(): void {
    this.displaypending();
    // this.startAutoReload();
    // this.filterapprove()
    // this.getFilteredEnrollments()
  }

  // ngOnDestroy(): void {
  //   // Clear the interval when the component is destroyed
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }

  // startAutoReload() {
  //   // Reload the data every 30 seconds (30000ms)
  //   this.intervalId = setInterval(() => {
  //     this.displaypending();
  //   }, 30000);  // 30 seconds interval
  // }


  displaypending() {
    this.conn.getData().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);

      if (this.students && this.students.length > 0) {
        const pendingTransactions = this.students.filter((transaction: any) => transaction.payment_approval === null);

        if (pendingTransactions.length > 0) {
          console.log('Pending Transactions:', pendingTransactions);

          this.students = pendingTransactions.sort((a: any, b: any) => {
            const lastNameComparison = a.lname.localeCompare(b.lname);
            if (lastNameComparison === 0) {
              return a.fname.localeCompare(b.fname);
            }
            return lastNameComparison;
          });
        } else {
          console.log('No pending transactions found');
          this.students = [];
        }
      } else {
        console.log('No transactions available');
        this.students = [];
      }
    });
  }
  


}
