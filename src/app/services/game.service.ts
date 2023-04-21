import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  $id: BehaviorSubject<number> = new BehaviorSubject<any>(null);

  getWordIfExist(wordInsert: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }

  newGame() {
    this.http.get<number>(this.baseURL.concat('newGameasdasd')).subscribe({
      next: (response) => {
        this.$id.next(response);
      },
      error: () => {
        this.dialog.open(DialogComponent, {
          data: {text: 'Ha habido un fallo al generar la partida, ya se ve lo looser que eres, recarga anda', createbutton: false}});
      },
    });
  }
}
