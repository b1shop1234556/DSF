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
import { HttpClient } from '@angular/common/http';

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

  acc: any = {};
  user = { admin_id: localStorage.getItem('admin_id')};
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // To hold any error messages
  file:  File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;
  image: any;

  isLoading: boolean = true;

  enrollments: any;
  
  keyword: any;
  students: any;
  grade: any;
  currentDate: Date = new Date();


  constructor(
    private dialog: MatDialog,
    private route: Router,
    private connect: ConnectService,
    private http: HttpClient
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
        height: '590px', // Fixed height
        maxWidth: '2000px',
        maxHeight: '2000px',
    });
  }

  ngOnInit(): void {
    this.displaypending();
    // this.startAutoReload();
    // this.filterapprove()
    // this.getFilteredEnrollments()
    console.log(this.user.admin_id)
    this.loadExistingImage();
    this.get();
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
    this.connect.getData().subscribe((result: any) => {
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

  getGreeting(): string {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning, ';
    } else if (hours < 18) {
      return 'Good Afternoon, ';
    } else {
      return 'Good Evening, ';
    }
  }
  
  get(){
    console.log("success")
    this.connect.getAccount(this.user.admin_id).subscribe((result: any) => {
      console.log(result)
      this.acc = result;
      this.isLoading = false;
      // this.accountupdate.controls['fname'].setValue(this.acc.fname)
      // this.accountupdate.controls['mname'].setValue(this.acc.mname)
      // this.accountupdate.controls['lname'].setValue(this.acc.lname)
      // this.accountupdate.controls['email'].setValue(this.acc.email)
      // this.accountupdate.controls['address'].setValue(this.acc.address)
      // this.accountupdate.controls['currentPassword'].setValue(this.acc.password)
      
    })
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0] as File;
    this.previewImage();
  }
  previewImage(){
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Update image preview with selected file
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('admin_pic', this.selectedFile, this.selectedFile.name);
      
      this.http.post(`http://localhost:8000/api/profile-image/${this.user.admin_id}`, formData)
        .subscribe(
          (response: any) => {
            // After successful image upload, reload the image preview
            this.loadExistingImage();
            // Optionally, you can reload the page or navigate to another route if necessary
          },
          (error: any) => {
            console.error('Error uploading image:', error);
            // You can handle the error silently or log it to the console
          }
        );
    } else {
      // Optionally, you can show a message in the console or just leave it empty
      console.log('No file selected for upload.');
    }
  }
  

  loadExistingImage() {
    if (this.user.admin_id) {
      this.connect.getAccount(this.user.admin_id).subscribe(
        (response: any) => {
          if (response.admin_pic) {
            this.existingImageUrl = `http://localhost/profile_images/${response.admin_pic}`;
            this.imagePreview = this.existingImageUrl; // Set the preview to existing image
            console.log(this.existingImageUrl)
          } else {
            this.imagePreview = null; // Clear preview if no image exists
            this.message = 'No existing image found.'; // Message if no image
          }
        },
        (error) => {
          console.error('Error loading existing image:', error);
          this.message = 'Error loading existing image. Please try again.';
        }
      );
    } else {
      this.imagePreview = null; // Clear the preview if no admin_id
      this.message = 'No Admin admin_id found. Please log in again.';
    }
  }
}
