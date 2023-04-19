import { Component } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';
import { TECLADO } from 'src/assets/datos/datos';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  palabraModel: Palabra = {
    nombre: '',
  };

  teclado: string[] = TECLADO;
  variableWord: any;
  constructor(private gameService: GameService) {}

  sendWord() {
    this.gameService.getWordIfExist(this.palabraModel.nombre).subscribe({
      next: (response) => {
        this.variableWord = response;
      },
    });
  }

  sendLetter(tecla: string) {
    if (this.palabraModel.nombre.length >= 5) return;
    this.palabraModel.nombre += tecla;
  }

  deleteLetter() {
    this.palabraModel.nombre = this.palabraModel.nombre.slice(0, -1);
  }
}
