import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AdivinaLaPalabra-Front';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.newGame();
  }
}
