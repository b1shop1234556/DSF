import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fix for stylesUrl
})
export class LoginComponent {
  constructor(
    private conn: ConnectService,
    private router: Router
  ) {}

  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    if (this.loginform.valid) {
      this.conn.logins(this.loginform.value).subscribe((result: any) => {
        if (result.token != null) {
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('token', result.token); // Save the token only in the browser
          }
          this.router.navigate(['/main-page']);
        }
        console.log(result);
      });
    }
  }
  
}
