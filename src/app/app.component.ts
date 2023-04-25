import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AdivinaLaPalabra-Front';



  constructor(private gameService: GameService,private dialog: MatDialog) {}

  ngOnInit() {
    
    this.gameService.newGame().subscribe({
      next: (response) => {
          this.gameService.$id.next(response);
      },
    });
  }
}
