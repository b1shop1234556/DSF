import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-input-view-payment',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
  styleUrls: ['./input-payment.component.css'] // Corrected from styleUrl to styleUrls
})
export class InputPaymentComponent implements OnInit {
  @ViewChild('zoomedIn') zoomedIn: ElementRef | undefined;

  students: any;
  LRN: { id: string | null } = { id: localStorage.getItem('LRN') };

  inputAmount = new FormGroup({
    OR_number: new FormControl(null),
    description: new FormControl(null),
    amount_paid: new FormControl(0),
    LRN: new FormControl(this.LRN.id)
  });

  constructor(
    public dialogRef: MatDialogRef<InputPaymentComponent>,
    private conn: ConnectService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.showdata();
  }

  showdata(): void {
    this.conn.findtransac(this.LRN.id).subscribe((result: any) => {
      this.students = result;
      this.inputAmount.patchValue({
        OR_number: this.students.OR_number,
        description: this.students.description,
        amount_paid: this.students.amount_paid,
      });
    });
  }

  saveFunct(): void {
    const updateData = { id: this.students.id, ...this.inputAmount.value };
    
    this.conn.updatePayment(this.LRN.id, updateData).subscribe(
      (result: any) => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error occurred while processing payment:', error);
      }
    );
  }

  approveReceipt(id: any) {
    // Validate that LRN.id and id are not undefined
    if (this.LRN.id && id) {
      this.conn.approveEnrollment(id).subscribe({
        next: (response) => {
          console.log('Update Successful');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Enrollment Approved Successfully',
            showConfirmButton: true,
          }).then(() => {
            // Navigate only if LRN.id is defined
            this.route.navigate(['/main-page/enrollees/homepage/approve']);
            this.dialogRef.close();
          });
        },
        error: (error) => {
          console.error('Update failed', error);
        },
      });
    } else {
      console.error('LRN.id or id is undefined, cannot navigate.');
      // Optionally show an error message or handle the invalid case
    }
  }
  

  onMouseMove(event: MouseEvent): void {
    const zoomElement = this.zoomedIn?.nativeElement as HTMLElement;
    const imageElement = event.target as HTMLImageElement;

    const { left, top, width, height } = imageElement.getBoundingClientRect();

    const x = (event.clientX - left) / width * 100;
    const y = (event.clientY - top) / height * 100;

    zoomElement.style.backgroundImage = `url(${imageElement.src})`;
    zoomElement.style.backgroundSize = `${width * 2}px ${height * 2}px`;
    zoomElement.style.backgroundPosition = `${x}% ${y}%`;

    zoomElement.style.display = 'block';
  }

  onMouseLeave(): void {
    const zoomElement = this.zoomedIn?.nativeElement as HTMLElement;
    zoomElement.style.display = 'none';
  }
}
