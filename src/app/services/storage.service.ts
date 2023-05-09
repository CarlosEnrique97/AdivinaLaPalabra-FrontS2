import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookies: CookieService) {}

  setToken(token: string) {
    this.cookies.set('UserToken', token, 15);
  }

  getToken() {
    return this.cookies.get('UserToken');
  }
}