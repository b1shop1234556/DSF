import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';

@Component({
  selector: 'app-input-payment',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
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
  templateUrl: './input-payment.component.html',
  styleUrl: './input-payment.component.css'
})
export class InputPaymentComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<InputPaymentComponent>, 
    private conn: ConnectService,
    private route: Router
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
