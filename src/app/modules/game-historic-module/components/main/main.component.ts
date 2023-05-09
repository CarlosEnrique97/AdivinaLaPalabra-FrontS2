import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LastTenGames } from 'src/app/interfaces/palabra';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  lastTenGames: LastTenGames[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    
  }
  getLastGames(): LastTenGames[] {
    return this.lastTenGames;
  }

  
  convertDate() {
    const datePipe = new DatePipe('en-US');
    this.lastTenGames.forEach((item, index) => {
      const fecha: Date | null = new Date(item.date);
      this.lastTenGames[index].date =
        datePipe.transform(fecha, 'dd/MM/yyyy HH:mm') ?? '';
    });
  }
}
