import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { ConnectService } from '../../../connect.service';
import { NgxPrintModule } from 'ngx-print';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [
    NgxPrintModule,
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
    FormsModule,
    ReactiveFormsModule
  ],
 templateUrl: './statement.component.html',
  styleUrl: './statement.component.css'
})
export class StatementComponent implements OnInit{
  LRN:{ id: string | null } = {id:localStorage.getItem('LRN')}
  students: any;
  lname:any;
  fname: any;
  mname: any;
  currentDate: any;
  remaining_balance: any;
  tuition: any;
  total_paid: any;
  name: any;

  selectedFile: File | null = null;

  constructor(
    private conn: ConnectService
  ){}
  
  formDate(date: Date):string{
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  
  uploadFiles(): void {
    console.log("Initiating file upload...");

    if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile); // Ensure the key is 'file'

        this.conn.uploadFiles(formData).subscribe(
            (response: any) => {
                console.log('File uploaded successfully:', response);
                this.refreshDataList();
                alert('File uploaded successfully!');
            },
            (error: any) => {
                console.error('Error uploading file:', error);
                alert('Error uploading file. Please try again.');
            }
        );
    } else {
        console.warn('No file selected');
        alert('Please select a file to upload.');
    }
}




private refreshDataList(): void {
  this.conn.getDatalist().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
      
      // Filter for pending transactions
      if (this.students && this.students.length > 0) {
          const pendingTransactions = this.students.filter((transaction: any) => transaction.payment_approval === 'Approve');
          this.students = pendingTransactions.length > 0 ? pendingTransactions : [];
          console.log(pendingTransactions.length > 0 ? 'Pending Transactions:' : 'No pending transactions found', this.students);
      } else {
          console.log('No transactions available');
          this.students = [];
      }
  });
}



  ngOnInit(): void {

    this.currentDate = this.formDate(new Date());
    console.log(this.LRN.id)
    this.conn.printSOA(this.LRN.id).subscribe((result: any) => {
      this.students = result.payments;
      this.name = result.payments[0].name;
      this.remaining_balance = result.remaining_balance;
      this.tuition = result.payments[0].tuition;
      this.total_paid = result.total_paid;
      console.log(this.students, this.tuition)
      // this.remaining_balance = result[0].remaining_balance;
      // this.lname = result[0].lname;
      // this.fname = result[0].fname;
      // this.mname = result[0].mname;
      // console.log(this.students, this.lname, this.fname, this.mname);
      //   if (this.students && this.students.length > 0) {
      //     // Filter the transactions to include only those with status 'Pending'
      //     const pendingTransactions = this.students.filter((transaction: any) => transaction.payment_approval === 'Approve');

      //     if (pendingTransactions.length > 0) {
      //         // If there are pending transactions, log them
      //         console.log('Pending Transactions:', pendingTransactions);
      //         // You can assign the pending transactions to a variable to display them in your template
      //         this.students = pendingTransactions;
      //     } else {
      //         // If no pending transactions are found, handle accordingly
      //         console.log('No pending transactions found');
      //         // Optional: clear the transactions or show a message in your template
      //         this.students = [];
      //     }
      // } else {
      //     // Handle the case where no transactions are available
      //     console.log('No transactions available');
      //     this.students = [];
      // }
      
    })
  }
}
