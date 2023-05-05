import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';


const baseUrl = 'http://10.102.30.50:8080/';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY0dGMVptRnVaRzl6IiwiaWF0IjoxNjgzMjgwNTk2LCJleHAiOjE3NzMyODA1OTZ9.j4zZFf1aC63GxV4QUizbZWQQbLh8Ve0gc1CA7Bse7K0';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const decodedToken: any = jwt.decode(token);

const username: string = decodedToken?.user;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  mostrar() {
    console.log(username);
  }

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
    return this.http.post(baseUrl + 'signout', {}, httpOptions);
  }
}
