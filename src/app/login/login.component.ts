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
        this.conn.logins(this.loginform.value).subscribe(
          (result: any) => {
            if (result.token != null) {
              localStorage.setItem('token', result.token);
              localStorage.setItem('admin_id', result.admin.admin_id);
              // image get
              const user = result.admin;
              if (user && user.admin_pic) {
                if (!user.admin_pic.startsWith('http://localhost:8000')) {
                  user.admin_pic = `http://localhost:8000/assets/adminPic/${user.admin_pic}`;
                }
              }
              localStorage.setItem('user', JSON.stringify(user));
              
              console.log('Token stored:', result.token);
              this.router.navigate(["/main-page"]);
            }
            else{
              Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: "Invalid Email or Password",  
              });
            }
            
            
            console.log(result);
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Invalid Email or Password",  
            });
          }
        );
    }
}
