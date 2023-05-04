import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://10.102.30.50:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      baseUrl + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  
  logout(): Observable<any> {
    return this.http.post(baseUrl + 'signout', { }, httpOptions);
  }
}