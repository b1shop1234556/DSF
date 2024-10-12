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

  getData(){
    return this.http.get(this.url + 'display');
  }

  findtransac(id :any){
    return this.http.get(`${this.url}receiptdisplay/${id}`);
  }

  approveEnrollment(id :any){
    return this.http.get(`${this.url}approveEnrollment/${id}`);
  }

  displaygrade(){
    return this.http.get(this.url + 'displaygrade');
  }
  displayStudent(){
    return this.http.get(this.url + 'displayStudent');
  }

  printSOA(id :any){
    return this.http.get(`${this.url}displaySOA/${id}`);
  }

  updatePayment(id: any, data: any) {
    return this.http.put(`${this.url}updatepayment/${id}`, data);
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
