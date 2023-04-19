import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  wordExist: any;
  BASEURL = './assets/data/palabras.json';
  constructor(private http : HttpClient) {}

  setInfoWord(wordInsert: string){
    this.http.post(this.BASEURL).subscribe
  }

  getInfoWord(){
   
    this.http.get(this.BASEURL).subscribe({
      next: (response) => {
        if(!response) return;
        this.wordExist = response ;
      }
    })
  }

}
