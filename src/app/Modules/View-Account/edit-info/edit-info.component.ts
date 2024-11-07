import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../../../connect.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { response } from 'express';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
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
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
  templateUrl: './edit-info.component.html',
  styleUrl: './edit-info.component.css'
})
export class EditInfoComponent implements OnInit{
  // user: any;
  acc: any;
  user = { id: localStorage.getItem('id')};
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string = ''; // To hold any error messages
  file:  File | null = null;
  selectedFile: File | null = null;
  message: string = '';
  existingImageUrl: string | null = null;
  intervalId: any;
  image: any;

  constructor(
    private connect: ConnectService,
    private route: Router,
    private http: HttpClient
  ){}

  accountupdate = new FormGroup({
    fname: new FormControl(null),
    mname: new FormControl(null),
    lname: new FormControl(null),
    currentPassword: new FormControl(null),
    password: new FormControl(null),
    confirmpassword: new FormControl(null),
    email: new FormControl(null),
    address: new FormControl(null),
  })

  ngOnInit(): void {
    // this.user = { id: localStorage.getItem('id')}
    console.log(this.user.id)
    this.loadExistingImage();
    this.startPolling(); 
    this.get();
    
  }
  save(){
    const updateData = {id: this.user.id, ...this.accountupdate.value}
    console.log(updateData);
    this.connect.updateAccount(updateData).subscribe(response => {
      this.route.navigate(['/main-page/account/acc-homepage/'])
    })
  }
  get(){
    this.connect.getAccount(this.user.id).subscribe((result: any) => {
      console.log(result)
      this.acc = result
      this.accountupdate.controls['currentPassword'].setValue(this.acc.password)
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
  onUpload(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('admin_pic', this.selectedFile, this.selectedFile.name);
    
      this.http.post(`http://localhost:8000/api/profile-image/${this.user.id}`, formData)
        .subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Success!',
              text: 'Image uploaded successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.loadExistingImage();
              this.route.navigate(["/main/accountpage/accountmain/accountview/"]);
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

  loadExistingImage() {
    if (this.user.id) {
      this.connect.getAccount(this.user.id).subscribe(
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
      this.imagePreview = null; // Clear the preview if no ID
      this.message = 'No Admin ID found. Please log in again.';
    }
  }
  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('id');
      if (latestAdminId !== this.user.id) {
        this.user.id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300); // Check every second
  }

}
