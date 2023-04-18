import { CommonModule } from '@angular/common';
import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainModuleRoutingModule
  ]
})
export class MainModuleModule { }
