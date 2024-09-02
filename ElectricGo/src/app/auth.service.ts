import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }
  private AUTH_URL ='http://localhost:3000/api/auth';

  login(email: string, password: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        email: email,
        password: password,
      }
    }
    console.log(this.AUTH_URL + '/signin');
    return this.http.post(
      this.AUTH_URL + '/signin',
      {
        email,
        password
      },
      this.httpOptions
    );
    
  }


  
}
