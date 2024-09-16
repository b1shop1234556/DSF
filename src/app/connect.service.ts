import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
   
  private url = 'http://localhost:8000/api/'; // Adjusted URL

  constructor(private http: HttpClient) {}

  logins(data: any): Observable<any> {
    return this.http.post(this.url + 'login', data);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url + 'logout', {}, { headers });
  }

  
  // logins(email: string, password: string): Observable<any> {
  //   return this.http.post(this.url, { email, password });
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('personal_access_token');
  // }

  // logout(): void {
  //   localStorage.removeItem('personal_access_token');
  // }
}
