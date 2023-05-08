import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class Logininterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY0dGMVptRnVaRzl6IiwiaWF0IjoxNjgzMjgwNTk2LCJleHAiOjE3NzMyODA1OTZ9.j4zZFf1aC63GxV4QUizbZWQQbLh8Ve0gc1CA7Bse7K0';

    if (token != null) {
      const TokenReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(TokenReq);
    } else {
      this.router.navigate(['login']);
      return next.handle(req);
    }
  }
}
