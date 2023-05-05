import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';

const baseUrl = 'http://10.102.30.50:8080/';

const token = '';

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
      baseUrl + 'auth/login',
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