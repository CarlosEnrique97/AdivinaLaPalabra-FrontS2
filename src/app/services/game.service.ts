import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.30.50:8080/';
  constructor(private http: HttpClient) {}

  $respuesta: BehaviorSubject<Boolean> = new BehaviorSubject<any>(Boolean);
  $id: BehaviorSubject<Number> = new BehaviorSubject<any>(Number);

  getWordIfExist(wordInsert: String) {
    this.http
      .get<Boolean>(this.baseURL.concat('checkIfWordExists/' + wordInsert))
      .subscribe({
        next: (response) => {
          this.$respuesta.next(response);
        },
      });
    return this.$respuesta;
  }

  newGame() {
    this.http
    .get<Number>(this.baseURL.concat('newGame'))
    .subscribe({
      next: (response) => {
        this.$id.next(response);
      },
    });
  }
}
