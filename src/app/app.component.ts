import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AdivinaLaPalabra-Front';
  mostrarModal: Boolean = false;

  constructor(private gameService: GameService,) {}

  ngOnInit() {
    this.gameService.newGame().subscribe({
      next: () => {
        this.gameService.$blockKeyboard.next(false);
      },
      error: () => {
        this.mostrarModal = true;

        this.gameService.$blockKeyboard.next(true);
      },
    });
  }
}
