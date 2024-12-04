import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgxPrintModule } from 'ngx-print';
import { CustomSidenavComponent } from '../../../custom-sidenav/custom-sidenav.component';
import { SearchFilterPipe } from '../../../search-filter.pipe';
import { ViewViewComponent } from '../../Enrollees/view-view/view-view.component';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import { StatementComponent } from '../statement/statement.component';
import Swal from 'sweetalert2';
import { InputPaymentComponent } from '../../Enrollees/input-payment/input-payment.component';

@Component({
  selector: 'app-view-financials',
  standalone: true,
  imports: [
    NgxPrintModule,
    CommonModule,
    ViewViewComponent,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    CustomSidenavComponent,
    MatBadgeModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    SearchFilterPipe,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './view-financials.component.html',
  styleUrl: './view-financials.component.css'
})
export class ViewFinancialsComponent implements OnInit {
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
    this.conn.displayFinancials(this.LRN.id).subscribe((result: any) => {
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
