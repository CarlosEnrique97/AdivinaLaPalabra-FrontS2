import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookies: CookieService) {}

  setToken(token: string) {
    this.cookies.set('UserToken', token);
  }

  getToken() {
    return this.cookies.get('UserToken');
  }
}