import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GameService } from '../services/game.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog, private gameService: GameService) {}

  intercept(
    request: HttpRequest<any>,

    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(this.MessageError(error));
      })
    );
  }

  MessageError(error: any) {
    this.dialog.open(DialogComponent, {
      data: {
        text: error.error.message,
        createButton: true,
      },
    });

    this.gameService.$disableKeyboard.next(true);
  }
}
