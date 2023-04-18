import { Component, OnInit } from '@angular/core';
import { Palabra } from './palabra';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  palabraModel: Palabra = {
    nombre: '',
  };

  azucar: boolean = false;
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  formularioEnviado() {
    console.log(
      'El formulario fue enviado y la palabra es: ',
      this.palabraModel
    );
    alert('Enviado');
    this.azucar = this.gameService.wordIfExist;
    console.log(this.gameService.wordIfExist);
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
    if (this.palabraModel.nombre.length < 5) {
      this.palabraModel.nombre += Tecla;
    }
  }

  BorrarLetra(){
    this.palabraModel.nombre = this.palabraModel.nombre.slice(0,-1);
  }
}
