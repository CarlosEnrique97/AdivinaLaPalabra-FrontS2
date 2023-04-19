import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any = null;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  wordExist: any;
  BASEURL = 'http://10.102.31.7:8080/';
  constructor(private http : HttpClient) {}

  getInfoWord(word: string){
    this.http.get(this.BASEURL.concat(`checkIfWordExists/${word}`)).subscribe({
      next: (response) => {
        if(!response) return;
        this.wordExist = response;
      }
    })
  }

=======
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
>>>>>>> d87256c6cf92c8cd4ebf59312a19c36b033a6b6a
}
