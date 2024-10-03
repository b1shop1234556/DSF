import { Component, OnInit } from '@angular/core';
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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-view',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent, MatBadgeModule, MatMenuModule, MatListModule, MatDialogModule],
  templateUrl: './view-view.component.html',
  styleUrl: './view-view.component.css'
})
export class ViewViewComponent implements OnInit{
  students: any;
  LRN:{ id: string | null } = {id:localStorage.getItem('LRN')}

  constructor(public dialogRef: MatDialogRef<ViewViewComponent>, private conn: ConnectService) {}
  ngOnInit(): void {
    console.log(this.LRN.id)
    this.conn.findtransac(this.LRN.id).subscribe((result: any) => {
      this.students = result;
      console.log(this.students);
    })
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
