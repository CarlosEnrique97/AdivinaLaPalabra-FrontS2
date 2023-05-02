import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { GameID, LetterStatus, Palabra } from '../interfaces/palabra';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
<<<<<<< HEAD
  baseURL = 'http://10.102.31.7:8080/';
  id = "";

=======
  baseURL = 'http://10.102.30.50:8080/';
  id = 0;
>>>>>>> d532b6c8ff709b27e8f48e25426941f5420f8621
  constructor(private http: HttpClient) {}

  $id: BehaviorSubject<GameID> = new BehaviorSubject<GameID>({ game_id: "" });
  $disableKeyboard: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getWordIfExist(wordInsert: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }

  getId() {
    this.$id.subscribe({
      next: (response: GameID) => {
        this.id = response.game_id;
      },
    });
  }

  newGame() {
    this.getId();
    this.http.get<GameID>(this.baseURL.concat('newGame')).subscribe({
      next: (response: GameID) => {
        this.$id.next(response);
      },
    });
  }

  getValidatePosition(wordInsert: Palabra): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.post<LetterStatus>(
      this.baseURL.concat('validatePositions/' + this.id),
      wordInsert,
      { headers }
    );
  }
}
