import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://10.102.31.7:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// const decodedToken = JSON.parse(atob(token.split('.')[1]));

// const username: string = decodedToken.user;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(baseUrl + 'auth/login', user);
  }

  logout(): Observable<any> {
    return this.http.post(baseUrl + 'signout', {}, httpOptions);
  }
}
