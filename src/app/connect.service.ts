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
  // private url = 'http://10.0.64.95:8000/api/'; // Adjusted URL

  constructor(private http: HttpClient) {}

  logins(data: any): Observable<any> {
    return this.http.post(this.url + 'login', data);
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.url + 'logout', {}, { headers });
  }

   //----editing profiles-----
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

  // view_financials
  displayFinancials(id :any){
    return this.http.get(`${this.url}displayFinancials/${id}`);
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


  // for msg section
  sendMessage(message: any){
    return this.http.post(`${this.url}messages`, message);
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.url}messages`);
  }


  //inserting tuition
  addtuitionfee(data: any){
    return this.http.post(`${this.url}addtuitionfee`, data);
  }
  tuitiondisplay(){
    return this.http.get(this.url + 'tuitiondisplay');
  }

  updateTuitionFee(id: any, data: any) {
    return this.http.put(`${this.url}updateTuitionFee/${id}`, data);
}

//   updateTuitionFee(id: number, data: any): Observable<any> {
//     return this.http.put(`http://localhost:8000/api/updateTuitionFee/${id}`, data)
//         .pipe(
//             catchError((error) => {
//                 console.error('Error occurred:', error);
//                 return throwError(error);
//             })
//         );
// }


  findfees(id :any){
    return this.http.get(`${this.url}findfees/${id}`);
  }
  
}
