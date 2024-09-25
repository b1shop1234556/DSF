import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import Swal from 'sweetalert2';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-view',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule],
  templateUrl: './view-view.component.html',
  styleUrl: './view-view.component.css'
})
export class ViewViewComponent {

  constructor(public dialogRef: MatDialogRef<ViewViewComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
