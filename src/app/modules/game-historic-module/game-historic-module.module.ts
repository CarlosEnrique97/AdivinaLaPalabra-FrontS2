import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameHistoricModuleRoutingModule } from './game-historic-module-routing.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GameHistoricModuleRoutingModule
  ]
})
export class GameHistoricModuleModule { }
