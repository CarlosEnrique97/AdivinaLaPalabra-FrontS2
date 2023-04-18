import { Component, OnInit } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';

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

  Teclado: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  EnviarLetra(Tecla: string) {
    console.log(Tecla);
  }
}
