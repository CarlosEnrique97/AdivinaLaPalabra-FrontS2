import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

    timeExpiration = 15;

  constructor(private cookies: CookieService) {}

  setToken(token: string) {
    this.cookies.set('UserToken', token, this.timeExpiration);
  }

  getToken() {
    return this.cookies.get('UserToken');
  }
}
