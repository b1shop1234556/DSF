import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  url = "http://localhost/capstone/"

  // Get student data from the PHP backend
  getstudent(): Observable<any> {
    return this.http.get<any>(this.url + 'studentview.php');
  }

  getlist(): Observable<any> {
    return this.http.get<any>(this.url + 'listview.php');
  }
}
