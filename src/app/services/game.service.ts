import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.30.50:8080/';

  constructor(private http: HttpClient) {}

  $id: BehaviorSubject<Number> = new BehaviorSubject<any>(Number);
  $blockKeyboard: BehaviorSubject<Boolean> = new BehaviorSubject<any>(Boolean);

  getWordIfExist(wordInsert: String): Observable<Boolean> {
    return this.http.get<Boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }

  newGame(): Observable<number> {
    return this.http.get<number>(this.baseURL.concat('newGame'));
  }
}
