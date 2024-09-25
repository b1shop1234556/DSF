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

@Component({
  selector: 'app-approvepage',
  standalone: true,
  imports: [
    ViewViewComponent,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './approvepage.component.html',
  styleUrls: ['./approvepage.component.css'] // Corrected this to styleUrls
})
export class ApprovepageComponent {
  students: any;

  constructor(
    private dialog: MatDialog,
    // private conn: PostService,
    private route: Router,
    private conn: ConnectService
  ) {}

  openModal(): void {
    this.dialog.open(ViewViewComponent, {
      width: '900%', // Adjust width as needed
      maxWidth: '900px', // Set a max width for the modal
      // height:'500px'
    });
  }

  ngOnInit(): void {
    this.conn.getData().subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
    })
  }

}
