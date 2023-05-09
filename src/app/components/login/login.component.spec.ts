import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MainModuleModule } from 'src/app/modules/main-module/main-module.module';
import { GameHistoricModule } from '../gameHistoric/game-historic.module';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MainModuleModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        GameHistoricModule,
      ],
      declarations: [LoginComponent],
      providers: [AuthService, StorageService],
    })
      .compileComponents()
      .then(() => {
        authService = TestBed.inject(AuthService);
        storageService = TestBed.inject(StorageService);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('Se debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    fixture.detectChanges();

    const username = login.userForm.controls['username'];
    username.setValue('pepe');

    expect(login.userForm.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    fixture.detectChanges();

    const username = login.userForm.controls['username'];
    username.setValue('pepe');
    const password = login.userForm.controls['password'];
    password.setValue('1234');

    expect(login.userForm.invalid).toBeFalse();
  });

  it('Debe retornar palabra encriptada', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const login = fixture.componentInstance;
    fixture.detectChanges();

    const result = login.encrypt('pepe');

    expect(result).toEqual('cGVwZQ==');
  });

  xit('Debe llamar a login desde authService', () => {
    
  });

  xit('Debe llamar a setToken desde storageService', () => {
    
  });
});
