// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-custom-sidenav',
//   standalone: true,
//   imports: [],
//   templateUrl: './custom-sidenav.component.html',
//   styleUrl: './custom-sidenav.component.css'
// })
// export class CustomSidenavComponent {

// }

import { CommonModule } from '@angular/common';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { ConnectService } from '../connect.service';
import { HttpClient } from '@angular/common/http';

export type MenuItem = {
  icon: string,
  label: string,
  route: string,
  subItems?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule, MenuItemComponent],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent implements OnInit{

  ngOnInit(): void {
    this.get();
    this.loadExistingImage();
    this.startPolling();
  }
  
  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

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


  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Enrollees',
      route: 'enrollees',
      // subItems: [
      //   {
      //     icon: 'check',
      //     label: 'Approval',
      //     route: 'enrollees/homepage/approve',
      //   },
      //   {
      //     icon: 'recent_actors',
      //     label: 'List of Enrollees',
      //     route: 'enrollees/homepage/list',
      //   },
        // {
        //   icon: 'recent_actors',
        //   label: 'Roster',
        //   route: 'enrollment/enrollmentpage/roster',
        // },
      // ]
    },
    {
      icon: 'list',
      label: 'Statement of Account',
      route: 'student'
    },
    // {
    //   icon: 'home',
    //   label: 'Student Account',
    //   route: 'home'
    // },
    // {
    //   icon: 'account_circle',
    //   label: 'My Account',
    //   route: '-'
    // },
    // {
    //   icon: 'logout',
    //   label: 'Logout',
    //   route: 'login'
    // }
    {
      icon: 'account_balance_wallet',
      label: 'Tuition Fees',
      route: 'inserts'
    }
  ]);

  constructor(
    private connect: ConnectService,
    private route: Router,
    private http: HttpClient
  ){}
 
  profilePicSize = computed( ()=> this.sideNavCollapsed() ? '32' : '100');
  get(){
    this.connect.getAccount(this.user.admin_id).subscribe((result: any) => {
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
  startPolling() {
    this.intervalId = setInterval(async () => {
      const latestAdminId = localStorage.getItem('admin_id');
      if (latestAdminId !== this.user.admin_id) {
        this.user.admin_id = latestAdminId;
        this.loadExistingImage();
      }
    }, 300); // Check every second
  }
}