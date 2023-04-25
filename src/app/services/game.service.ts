import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GameID, Palabra } from '../interfaces/palabra';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  $id: BehaviorSubject<GameID> = new BehaviorSubject<any>(null);
  id: number = 0;
  getWordIfExist(wordInsert: String): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }
  getValidatePosition(wordInsert: Palabra): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('validatePosition/' + wordInsert)
    );
  }
  newGame() {
    this.http.get<GameID>(this.baseURL.concat('newGame')).subscribe({
      next: (response) => {
        this.$id.next(response);
      },
      error: () => {
        this.dialog.open(DialogComponent, {
          data: 'La partida no se ha creado',
        });
      },
    });
  }
  getID() {
    this.$id.subscribe({
      next: (reponse: GameID) => {
        this.id = reponse.game_id;
      },
    });
  }
}
