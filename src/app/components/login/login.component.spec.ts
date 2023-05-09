import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuilder, FormGroup, Validators, Router],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Se debería crear', () => {
    expect(component).toBeTruthy();
  });

  fit('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    fixture.detectChanges();

    const username = login.userForm.controls['username'];
    username.setValue('pepe');

    expect(login.userForm.invalid).toBeTrue();
  });
});
