import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any = null;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient) {}

  getWordIfExist(wordInsert: string) {
    this.http
      .get<any>(this.baseURL.concat(`checkIfWordExists/${wordInsert}`))
      .subscribe({
        next: (response) => {
          if (!response) return;
          this.wordExist = response;
        },
      });
    console.log(this.wordExist);
  }
}
