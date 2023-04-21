import { Component } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';
import { TECLADO } from 'src/assets/datos/datos';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

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
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  sendWord() {
    this.gameService.getWordIfExist(this.palabraModel.nombre).subscribe({
      next: (response:any) => {
        if (response.wordExists) return;
        this.openDialog("La palabra no existe");
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

  openDialog(frase: string) {
    this.dialog.open(DialogComponent, {
      data: {text: 'La palabra no existe', createbutton: true}});
  };

}
