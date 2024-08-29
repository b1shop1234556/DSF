import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { ViewViewComponent } from '../view-view/view-view.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-approvepage',
  standalone: true,
  imports: [RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule],
  templateUrl: './approvepage.component.html',
  styleUrl: './approvepage.component.css'
})
export class ApprovepageComponent {

  constructor(private dialog: MatDialog){}

  openDialog(): void{
    const dialogRef = this.dialog.open(ViewViewComponent, {
      height: '800px',
      width: '800px'
    });
  }

}
