import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  uploadfile(formData: FormData) {
    throw new Error('Method not implemented.');
  }
   
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

  getAccount(id :any){
    return this.http.get(`${this.url}findacc/${id}`);
  }

  updateAccount(data :any){
    return this.http.put(`${this.url}updateacc/${data.admin_id}`,data);
  }

  getData(){
    return this.http.get(this.url + 'display');
  }

  getDatalist(){
    return this.http.get(this.url + 'displaylist');
  }

  getDataPUT(){
    return this.http.get(this.url + 'displayIN');
  }


//MSG--------------------
  displaymsg(){
    return this.http.get(this.url + 'display');
  }

  // getMessages(){
  //   return this.http.get(this.url + 'messages');
  // }

  // displayTWO(){
  //   return this.http.get(this.url + 'display');
  // }

//----------------------

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

  putPayment(id: any, data: any) {
    return this.http.put(`${this.url}updatepayment/${id}`, data);
  }
  //upload....
 


  // for msg section
  sendMessage(message: any){
    return this.http.post(`${this.url}messages`, message);
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.url}messages`);
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
