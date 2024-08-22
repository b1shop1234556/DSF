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
import { Component, computed, Input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

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
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false)
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Enrollees',
      route: 'enrollees',
      subItems: [
        {
          icon: 'recent_actors',
          label: 'List of Enrollees',
          route: 'enrollees/homepage/list',
        },
        {
          icon: 'check',
          label: 'Approve',
          route: 'enrollees/homepage/approve',
        },
        // {
        //   icon: 'recent_actors',
        //   label: 'Roster',
        //   route: 'enrollment/enrollmentpage/roster',
        // },
      ]
    },
    // {
    //   icon: 'home',
    //   label: 'Student Account',
    //   route: 'home'
    // },
    {
      icon: 'list',
      label: 'Student Account',
      route: 'student'
    }
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
  ]);
 
  profilePicSize = computed( ()=> this.sideNavCollapsed() ? '32' : '100');
}