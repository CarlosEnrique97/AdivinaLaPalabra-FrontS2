import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLostComponent } from './dialog-lost.component';

describe('DialogLostComponent', () => {
  let component: DialogLostComponent;
  let fixture: ComponentFixture<DialogLostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
