import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { ConnectService } from '../../../connect.service';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { StatementComponent } from '../statement/statement.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintSOAComponent } from '../print-soa/print-soa.component';
import { ViewFinancialsComponent } from '../view-financials/view-financials.component';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploadpage',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    SearchFilterPipe,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule],
  templateUrl: './uploadpage.component.html',
  styleUrl: './uploadpage.component.css'
})
export class UploadpageComponent {


  keyword: any;
  students:any;

  Modal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    // this.displaypending();
    this.dialog.open(StatementComponent, {
        width: '700px',  // Fixed width
        height: '327px', // Fixed height
        maxWidth: '800px',
        maxHeight: '800px',
    });
  }

  OpenModal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    // this.displaypending();
    this.dialog.open(PrintSOAComponent, {
        width: '805px',  // Fixed width
        height: '615px', // Fixed height
        maxWidth: '900px',
        maxHeight: '900px',
    });
  }

  OpModal(id: any): void {
    console.log(id);
    localStorage.setItem('LRN', id);
    // this.displaypending();
    this.dialog.open(ViewFinancialsComponent, {
        width: '815px',  // Fixed width
        height: '555px', // Fixed height
        maxWidth: '900px',
        maxHeight: '900px',
    });
  }



  ngOnInit(): void {
    this.conn.displayStudent().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
  
      if (this.students && this.students.length > 0) {
        // Filter for transactions where payment_approval is NOT null and not '0000-00-00'
        const approvedTransactions = this.students.filter((transaction: any) => 
          transaction.payment_approval !== null && transaction.payment_approval !== '0000-00-00'
        );
  
        if (approvedTransactions.length > 0) {
          console.log('Approved Transactions:', approvedTransactions);
          this.students = approvedTransactions;
  
          // Sort students alphabetically by lname (last name)
          this.students.sort((a: any, b: any) => {
            return a.lname.localeCompare(b.lname); // Sort by last name alphabetically
          });
  
        } else {
          console.log('No approved transactions found');
          this.students = [];
        }
      } else {
        console.log('No transactions available');
        this.students = [];
      }
    });
  }
  

  // constructor(
  //   private dialog: MatDialog,
  //   // private conn: PostService,
  //   private conn: ConnectService,
  //   private route: Router
  // ){}

  // [routerLink]="['/main-page/enrollees/homepage/viewdetails']"

  // getLRN(id: any){
  //   console.log(id);
  //   localStorage.setItem('LRN', id);
  //   this.route.navigate(['/main-page/student/home-page/soa'])
  // }

  images: any[] = [];
  myForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private conn: ConnectService,
    private route: Router
  ){
    this.myForm = new FormGroup({
      files: new FormControl(null) // Initialize the files control
    });
  }

  onFileChange(event: any) {
    const files = event.target.files;
    this.images = []; // Clear previous images
    const fileArray: File[] = []; // Array to hold File objects

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
      fileArray.push(files[i]); // Add each file to the array
    }

    // Set the files array to the form control
    this.myForm.patchValue({ files: fileArray });
  }

  submit(): void {
    console.log('clicked.');
    const files = this.myForm.get('files')?.value; // Get files from form control
  
    if (files && files.length > 0) {
      // If files are selected, upload them
      this.conn.uploadImages(files).subscribe(
        response => {
          // Success alert
          Swal.fire({
            title: 'Success!',
            text: 'Images uploaded successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Clear images array (remove previews)
            this.images = [];
  
            // Reset the file input field
            this.myForm.patchValue({ files: null });
  
            // After success, navigate or refresh as needed
            this.route.navigate(["/main-page/student/home-page"]);
          });
        },
        error => {
          // Error alert if the upload fails
          Swal.fire({
            title: 'Error!',
            text: 'Error uploading images. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Upload failed:', error);
        }
      );
    } else {
      // Warning alert if no files are selected
      Swal.fire({
        title: 'Warning!',
        text: 'Please select images first.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
  

  enlargedImage: string | null = null;
  showOverlay: boolean = false;

  enlargeImage(img: string): void {
    this.enlargedImage = img;
    this.showOverlay = true;
  }

  closeEnlargedImage(): void {
    this.enlargedImage = null;
    this.showOverlay = false;
  }

}
