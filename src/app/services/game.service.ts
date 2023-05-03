import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameID, LetterStatus, Palabra } from '../interfaces/palabra';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.30.50:8080/';
  id: string = '';

  constructor(private http: HttpClient) {}

  $disableKeyboard: BehaviorSubject<boolean> = new BehaviorSubject(false);

  getWordIfExist(wordInsert: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }

  getAttempts(): Observable<boolean>  {
    return this.http.get<boolean>(
      this.baseURL.concat('checkFiveAttempts/' + this.id)
    );
  }

  newGame() {
    this.http.get<GameID>(this.baseURL.concat('newGame')).subscribe({
      next: (response: GameID) => {
        this.id = response.game_id;
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
