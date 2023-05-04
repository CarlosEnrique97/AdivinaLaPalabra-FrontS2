import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main-module/main-module.module').then(
        (module) => module.MainModuleModule
      ),
  },
  {
    path: 'game-historic',
    loadChildren: () =>
      import('./components/gameHistoric/game-historic.module').then(
        (module) => module.GameHistoricModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
