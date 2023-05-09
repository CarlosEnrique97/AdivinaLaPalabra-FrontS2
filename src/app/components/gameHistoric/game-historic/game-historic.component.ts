import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { LastTenGames } from 'src/app/interfaces/palabra';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-historic',
  templateUrl: './game-historic.component.html',
  styleUrls: ['./game-historic.component.scss'],
})
export class GameHistoricComponent implements OnInit {
  lastTenGames: LastTenGames[] = [];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.setLatTenGames();
  }
  getLastGames(): LastTenGames[] {
    return this.lastTenGames;
  }

  setLatTenGames() {
    this.gameService.getLastTenGames().subscribe((response: LastTenGames[]) => {
      next: this.lastTenGames = response;
      this.convertDate();
    });
    this.gameService.listTenGames;
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
