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
  variableWord = false;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  constructor(private gameService: GameService) {}

  sendWord() {
    this.gameService.getWordIfExist(this.palabraModel.nombre).subscribe({
      next: (response: boolean) => {
        if (response) return;
        this.variableWord = true;
      },
    });
  }

  sendLetter(tecla: string) {
    if (this.palabraModel.nombre.length >= 5) return;
    this.palabraModel.nombre += tecla;
  }

  deleteLetter() {
    this.palabraModel.nombre = this.palabraModel.nombre.slice(
      this.inicioPalabra,
      this.finPalabra
    );
  }
}
