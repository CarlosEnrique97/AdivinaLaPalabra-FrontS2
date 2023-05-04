import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Logininterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token != null) {
      const TokenReq = req.clone({
        params: req.params.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(TokenReq);
    } else {
      this.router.navigate(['login']);
      return throwError('No se encontró token válido.');
    }
  }
}
