import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHistoricRoutingModule } from './game-historic-routing.module';
import { GameHistoricComponent } from './game-historic/game-historic.component';

@NgModule({
  declarations: [GameHistoricComponent],
  imports: [CommonModule, GameHistoricRoutingModule],
})
export class GameHistoricModule {}
