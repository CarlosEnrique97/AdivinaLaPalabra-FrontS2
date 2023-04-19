import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {

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

}
