import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://10.102.30.50:8080/';
constructor(private http: HttpClient) { }

  login(): void {
    
  }
  
  private readToken(): void{}

  private saveToken(): void{}

  private handlerError(): void{}
}
