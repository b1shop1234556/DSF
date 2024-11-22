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

  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private route: Router,
    private conn: ConnectService
  ) {}

  openModal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    this.dialog.open(ViewViewComponent, {
        width: '530px',  // Fixed width
        height: '500px', // Fixed height
        maxWidth: '800px',
        maxHeight: '800px',
    });
}

  Modal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    this.displaypending();
    this.dialog.open(InputPaymentComponent, {
        width: '700px',  // Fixed width
        height: '530px', // Fixed height
        maxWidth: '800px',
        maxHeight: '800px',
    });
  }

  ngOnInit(): void {
    this.displaypending()
    // this.filterapprove()
    // this.getFilteredEnrollments()
  }


  displaypending(){

    this.conn.getData().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
      if (this.students && this.students.length > 0) {
        // Filter the transactions to include only those with status 'Pending'
        const pendingTransactions = this.students.filter((transaction: any) => transaction.payment_approval === 'Pending');

        if (pendingTransactions.length > 0) {
            // If there are pending transactions, log them
            console.log('Pending Transactions:', pendingTransactions);

            // this.displaypending();
            
            // You can assign the pending transactions to a variable to display them in your template
            this.students = pendingTransactions;
        } else {
            // If no pending transactions are found, handle accordingly
            console.log('No pending transactions found');
            // Optional: clear the transactions or show a message in your template
            this.students = [];
        }
    } else {
        // Handle the case where no transactions are available
        console.log('No transactions available');
        this.students = [];
    }
    })
  }

  // formatDate(date:Date): string {
  //   const option: Intl.DateTimeFormatOptions = {
  //     month: 'long',
  //     day: '2-digit',
  //     year: 'numeric',
  //   };
  //   return date.toLocaleDateString{'en-US', options};
  // }


}
