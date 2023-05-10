import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFinishComponent } from './dialog-finish.component';

describe('DialogLostComponent', () => {
  let dialog: DialogFinishComponent;
  let fixture: ComponentFixture<DialogFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFinishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFinishComponent);
    dialog = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se deberia crear', () => {
    expect(dialog).toBeTruthy();
  });
});
