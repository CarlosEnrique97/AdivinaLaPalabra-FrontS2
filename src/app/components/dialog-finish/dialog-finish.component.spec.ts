import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinishComponent } from './dialog-finish.component';

describe('DialogLostComponent', () => {
  let component: DialogFinishComponent;
  let fixture: ComponentFixture<DialogFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
