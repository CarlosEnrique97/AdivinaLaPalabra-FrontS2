import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  baseURL = 'http://10.102.31.7:8080/';
  wordIfExist: any = null;

  constructor(private http: HttpClient) {}

  getWordIfExist(wordInsert: string) {
    this.http
      .get<any>(this.baseURL.concat(`checkIfWordExists/${wordInsert}`))
      .subscribe({
        next: (response) => {
          if (!response) return;
          this.wordIfExist = response;
        },
      });
    console.log(this.wordIfExist);
  }
}
