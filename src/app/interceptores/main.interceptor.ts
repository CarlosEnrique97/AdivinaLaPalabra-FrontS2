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
        let errorMessage = '';

        console.log(error);

        if (error.status === 0) {
          errorMessage = 'UPS, algo ha ido mal.';
        } else if (
          error.status === 500 &&
          error.url === 'http://10.102.31.7:8080/newGame'
        ) {
          errorMessage =
            'Ha habido un fallo al generar la partida, ya se ve lo looser que eres, recarga anda';
        } else if (error.status === 500) {
          errorMessage =
            'UPS, algo ha ido mal, no podremos saber lo looser que eres...';
        }

        return throwError(this.dialogError(errorMessage));
      })
    );
  }

  dialogError(error: string) {
    this.dialog.open(DialogComponent, {
      data: {
        text: error,

        createButton: false,
      },
    });

    this.gameService.$disableKeyboard.next(true);
  }
}
