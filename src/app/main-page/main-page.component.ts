// // import { CommonModule } from '@angular/common';
// // import { Component } from '@angular/core';
// // import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

// // @Component({
// //   selector: 'app-main-page',
// //   standalone: true,
// //   imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
// //   templateUrl: './main-page.component.html',
// //   styleUrl: './main-page.component.css'
// // })
// // export class MainPageComponent {

// // }



// import { Component, computed, signal } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import { CommonModule } from '@angular/common';
// import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
// import { MatButton, MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { CustomSidenavComponent } from "../custom-sidenav/custom-sidenav.component";
// import { MatExpansionModule } from '@angular/material/expansion';

// @Component({
//   selector: 'app-main-page',
//   standalone: true,
//   imports: [
//     RouterModule, MatSidenavModule, 
//     CommonModule, MatToolbarModule, 
//     MatButtonModule, MatIconModule, 
//     MatListModule, CustomSidenavComponent,
//     MatExpansionModule],
//    templateUrl: './main-page.component.html',
//   styleUrl: './main-page.component.css'
// })
// export class MainPageComponent {

//   collapsed = signal(false)

//   sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');  
  
// }

import { Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { CustomSidenavComponent } from "../custom-sidenav/custom-sidenav.component";
import { MatListModule } from '@angular/material/list';
import { ConnectService } from '../connect.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{

  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');  
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
  ngOnInit(): void {
    this.get();
    this.loadExistingImage();
    this.startPolling();
  }

  logout(){
    const header = localStorage.getItem('token')
    console.log(header)

    this.connect.logout().subscribe((results: any) => {
      localStorage.removeItem('token');
      this.route.navigate(['login-page']);
    })
  }
  get(){
    this.connect.getAccount(this.user.id).subscribe((result: any) => {
      console.log(result)
      this.acc = result
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