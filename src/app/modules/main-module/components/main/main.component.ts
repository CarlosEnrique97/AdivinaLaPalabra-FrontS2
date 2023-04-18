import { Component, OnInit } from '@angular/core';
import { Palabra } from './palabra';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  palabraModel: Palabra = {
    nombre: '',
  };

  constructor() {}

  ngOnInit() {}

  formularioEnviado() {
    console.log('El formulario fue enviado y la palabra es: ');
    alert('Enviado');
  }
}
