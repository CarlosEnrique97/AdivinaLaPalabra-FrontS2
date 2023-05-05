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
  private errorMessageDefault =
    'Ups, ha habido un error de conexión, por favor inténtelo de nuevo mas tarde';
  constructor(private dialog: MatDialog, private gameService: GameService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(this.messageError(error));
      })
    );
  }

  messageError(error: any) {
    let message = this.errorMessageDefault;
    if (error.status !== 0) {
      message = error.error.message;
    }
    this.showError(message);

    this.gameService.$disableKeyboard.next(true);
  }
  showError(message: string) {
    this.dialog.open(DialogComponent, {
      data: {
        text: message,
        createButton: true,
      },
    });
  }
}
