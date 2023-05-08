import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHistoricComponent } from './game-historic/game-historic.component';

const routes: Routes = [
  {
    path: '',
    component: GameHistoricComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameHistoricRoutingModule {}
