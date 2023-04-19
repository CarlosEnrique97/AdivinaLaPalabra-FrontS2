import { Component, OnInit } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
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

<<<<<<< HEAD
  wordExist: Boolean = false;

=======
  variableWord: boolean = false;
>>>>>>> d87256c6cf92c8cd4ebf59312a19c36b033a6b6a
  constructor(private gameService: GameService) {}

  ngOnInit() {}

  formularioEnviado() {
    console.log('El formulario fue enviado y la palabra es: ');
    alert('Enviado');
<<<<<<< HEAD
    this.gameService.getInfoWord(this.palabraModel.nombre);
    this.wordExist = this.gameService.wordExist;
=======
    this.gameService.getWordIfExist(this.palabraModel.nombre);
    this.variableWord = this.gameService.wordExist;
    console.log('esto es lo que peta', this.gameService.wordExist);
>>>>>>> d87256c6cf92c8cd4ebf59312a19c36b033a6b6a
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

<<<<<<< HEAD
  enviarLetra(Tecla: string) {
    console.log(Tecla);
=======
  EnviarLetra(Tecla: string) {
>>>>>>> d87256c6cf92c8cd4ebf59312a19c36b033a6b6a
    if (this.palabraModel.nombre.length < 5) {
      this.palabraModel.nombre += Tecla;
    }
  }

<<<<<<< HEAD
  deleteCharacter() {
=======
  BorrarLetra() {
>>>>>>> d87256c6cf92c8cd4ebf59312a19c36b033a6b6a
    this.palabraModel.nombre = this.palabraModel.nombre.slice(0, -1);
  }
}
