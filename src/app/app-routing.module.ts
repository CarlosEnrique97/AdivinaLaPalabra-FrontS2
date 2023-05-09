import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main-module/main-module.module').then(
        (module) => module.MainModuleModule
      )
  },
  {
    path:'login',
    component: LoginComponent
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
