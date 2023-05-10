import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

import { CommonModule, DatePipe } from '@angular/common';

import { GameHistoricModuleRoutingModule } from '../../game-historic-module-routing.module';

import { LastTenGames } from 'src/app/interfaces/palabra';

import { HttpClientModule } from '@angular/common/http';

fdescribe('MainComponent', () => {
  let component: MainComponent;

  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,

        GameHistoricModuleRoutingModule,

        HttpClientModule,
      ],

      declarations: [MainComponent],
    })

      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MainComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe convertir una fecha de tipo String a un Date', () => {
    const tenGame: LastTenGames = {
      date: '10-09-2001 08:00',

      winned: false,

      attempts: 0,
    };

    const lastTenGames: LastTenGames[] = component.lastTenGames;

    lastTenGames.push(tenGame);

    component.convertDate();

    expect(lastTenGames[0].date).toEqual('09/10/2001 08:00');
  });
});
