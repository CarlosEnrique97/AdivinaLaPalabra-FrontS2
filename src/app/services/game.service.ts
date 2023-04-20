import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient) {}

  $respuesta: BehaviorSubject<Boolean> = new BehaviorSubject<any>(Boolean);

  getWordIfExist(wordInsert: string) {
    this.http
      .get<boolean>(this.baseURL.concat(wordInsert))
      .subscribe({
        next: (response) => {
          this.$respuesta.next(response);
        },
        error: () =>{
          alert("Ha habido un error en la Conexión a la BBDD ")
        }
      });
      return this.$respuesta;
  }
}
