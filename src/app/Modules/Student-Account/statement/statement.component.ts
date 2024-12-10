import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
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
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

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
  selectedFileName: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  LRNs: any;

  constructor(
    public dialogRef: MatDialogRef<StatementComponent>, 
    private conn: ConnectService,
    private http: HttpClient,
    private route: Router
  ){}
  
  formDate(date: Date):string{
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  uploadFiles(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('filename', this.selectedFile, this.selectedFile.name);
      
      this.http.post(`http://localhost:8000/api/uploadfiles/${this.LRN.id}`, formData)
      // this.http.post(`http://192.168.3.38:8000/api/uploadfiles/${this.LRN.id}`, formData)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Success!',
              text: 'Image uploaded successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              // this.loadExistingImage();
              // this.startPolling();
              // localStorage.removeItem('Admin_ID'); 
              this.route.navigate(["/main-page/student/home-page"]);
              // location.reload(); // Reload the page after navigation
             
            });
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: 'Error uploading image. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error('Error:', error);
          }
        );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select an image first.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
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
      this.LRNs = result.payments[0].LRN;
      this.remaining_balance = result.remaining_balance;
      this.tuition = result.payments[0].tuition;
      this.total_paid = result.total_paid;
      console.log(this.students, this.tuition)   
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Update image preview with selected file
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


}
