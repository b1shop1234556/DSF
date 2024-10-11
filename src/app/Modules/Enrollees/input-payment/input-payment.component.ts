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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectService } from '../../../connect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-input-payment',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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

  students: any;
  LRN:{ id: string | null } = {id:localStorage.getItem('LRN')}

  inputAmount = new FormGroup({
    OR_number: new FormControl(null),
    date_of_payment: new FormControl(null),
    description: new FormControl(null),
    amount_paid: new FormControl(null),
    LRN: new FormControl(this.LRN.id)
  })

  constructor(
    public dialogRef: MatDialogRef<InputPaymentComponent>, 
    private conn: ConnectService,
    private route: Router
  ) {}

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

  saveFunct(){
    console.log(this.inputAmount.value);
    this.conn.addpayment(this.inputAmount.value).subscribe(
     (result: any)=>{
      if (result.message === 'Success'){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Work Has Been Saved",
        showConfirmButton: true,
      }).then(()=>{
       
      });
      this.route.navigate(['main/']);
  } else {
    console.error('Error Occurred during save:',result);
  }
    },
    (error) => {
      console.error('Error:', error);
    }
    );
  }
}
