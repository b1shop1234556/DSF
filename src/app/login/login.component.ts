import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,RouterLink,RouterLinkActive,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // email: any;
  // password: any;
  constructor (
    private conn: ConnectService,
    private router: Router
  ){}
  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    if (this.loginform.valid) {
      this.conn.logins(this.loginform.value).subscribe((result: any) => {
        if (result.token) {
          localStorage.setItem('token', result.token); // Save the token
          this.router.navigate(['/main-page']);
        }
        console.log(result);
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
