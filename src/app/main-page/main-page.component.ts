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

import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { CustomSidenavComponent } from "../custom-sidenav/custom-sidenav.component";
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');  
}