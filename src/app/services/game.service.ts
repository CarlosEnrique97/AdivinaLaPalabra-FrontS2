import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  wordExist: any= null;
  BASEURL = './assets/data/palabras.json';
  constructor(private http : HttpClient) {}
  
  getInfoWord(){
   
    this.http.get(this.BASEURL).subscribe({
      next: (response) => {
        if(!response) return;
        this.wordExist = response ;
      }
    })
  }

}
