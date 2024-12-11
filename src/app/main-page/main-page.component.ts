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

  adminPic: string | null = null;

  collapsed = signal(true)
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  menunavWidth = computed(() => this.collapsed() ? '65px' : '450px');
  constructor(private conn: ConnectService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the adminPic$ observable to get the image URL
    this.conn.adminPic$.subscribe((newImageUrl) => {
      if (newImageUrl) {
        this.adminPic = newImageUrl; // Update the component's admin picture
      }
    });

    // Optionally, initialize with the image from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.admin_pic) {
      this.adminPic = user.admin_pic;
    }
  }

  onLogout() {
    this.conn.logout().subscribe(
        (response) => {
            console.log('Logout successful:', response);
            localStorage.removeItem('token');
            localStorage.removeItem('user'); 
            localStorage.removeItem('admin_id');// Clear the token from localStorage
            this.router.navigate(['/login']); // Navigate to the login page
        },
        (error) => {
            console.error('Logout error:', error);
            // Optionally, handle specific error messages or status codes here
        }
    );
}
}