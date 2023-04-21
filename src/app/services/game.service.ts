import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  wordExist: any;
  baseURL = 'http://10.102.31.7:8080/';
  constructor(private http: HttpClient) {}

  $id: BehaviorSubject<number> = new BehaviorSubject<any>(null);

  getWordIfExist(wordInsert: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.baseURL.concat('checkIfWordExists/' + wordInsert)
    );
  }

  newGame(): Observable<number>{
    return this.http.get<number>(this.baseURL.concat('newGame'))
  }
}
