import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHistoricComponent } from './game-historic.component';

describe('GameHistoricComponent', () => {
  let component: GameHistoricComponent;
  let fixture: ComponentFixture<GameHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameHistoricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
