import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './insert.component.html',
  styleUrl: './insert.component.css'
})
export class InsertComponent implements OnInit{
  ngOnInit(): void {
   
  }


  tuitionfee = new FormGroup({
    grade_level: new FormControl(null),
    tuition: new FormControl(null),
    general: new FormControl(null),
    esc: new FormControl(null),
    subsidy: new FormControl(null),
    req_Downpayment: new FormControl(null)
  })

  saveForm(){
    console.log(this.tuitionfee.value)
  }

}
