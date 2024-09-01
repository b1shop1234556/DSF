import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  url = "http://localhost/capstone/"
  
  getstudent(){
    return this.http.get(this.url + 'studentview.php');
  }
}
