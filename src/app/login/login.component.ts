import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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
      this.conn.logins(this.loginform.value).subscribe(
        (result: any) => {
          if (result.token != null) {
            if (typeof window !== 'undefined' && window.localStorage) {
              localStorage.setItem('token', result.token); // Save the token in localStorage
              localStorage.setItem('id', result.user.id);  // Save the user ID
            }

            // Show success SweetAlert
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login Successful',
              // text: 'Welcome back!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/main-page']); // Redirect to the main page
            });
          } else {
            // Show error if login fails
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Login Failed',
              text: 'Incorrect credentials, please try again.',
              showConfirmButton: true
            });
          }
        },
        (error) => {
          console.error('Error during login:', error);
          // Show error alert if there's an API error
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'There was an issue with the login process. Please try again.',
            showConfirmButton: true
          });
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Validation Failed',
        text: 'Please fill in both fields before submitting.',
        showConfirmButton: true
      });
    }
  }
}
