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

  errorNoConection = 0;

  constructor(private dialog: MatDialog, private gameService: GameService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 0){
          error.error.message = "Ups, ha ocurrido un fallo"
        }
        return throwError(this.MessageError(error.error.message));
      })
    );
  }

  MessageError(messageError: string) {
    this.dialog.open(DialogComponent, {
      data: {
        text: messageError,
        createButton: true,
      },
    });
    this.gameService.$disableKeyboard.next(false);
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
