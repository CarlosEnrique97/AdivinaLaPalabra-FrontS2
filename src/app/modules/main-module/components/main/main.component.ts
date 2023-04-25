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
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
    pos5: '',
  };

  word = Object.values(this.palabraModel);
  wordSend = '';
  teclado: string[] = TECLADO;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  wordComplete = this.palabraModel.toString();

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  sendWord() {
    this.wordSend =
      this.palabraModel.pos1 +
      this.palabraModel.pos2 +
      this.palabraModel.pos3 +
      this.palabraModel.pos4 +
      this.palabraModel.pos5;
    this.gameService.getWordIfExist(this.wordSend).subscribe({
      next: (response: any) => {
        console.log(this.wordSend);
        if (response.wordExists) return;
        this.openDialog('La palabra no existe');
      },
    });
  }

  sendLetter(tecla: string) {
    if (this.palabraModel.pos1 === '') {
      this.palabraModel.pos1 = tecla;
    } else if (this.palabraModel.pos2 === '') {
      this.palabraModel.pos2 = tecla;
    } else if (this.palabraModel.pos3 === '') {
      this.palabraModel.pos3 = tecla;
    } else if (this.palabraModel.pos4 === '') {
      this.palabraModel.pos4 = tecla;
    } else if (this.palabraModel.pos5 === '') {
      this.palabraModel.pos5 = tecla;
    }
  }

  deleteLetter() {
    if (this.palabraModel.pos5) {
      this.palabraModel.pos5 = '';
    } else if (this.palabraModel.pos4) {
      this.palabraModel.pos4 = '';
    } else if (this.palabraModel.pos3) {
      this.palabraModel.pos3 = '';
    } else if (this.palabraModel.pos2) {
      this.palabraModel.pos2 = '';
    } else if (this.palabraModel.pos1) {
      this.palabraModel.pos1 = '';
    }
  }

  openDialog(frase: string) {
    this.dialog.open(DialogComponent, {
      data: frase,
    });
  }
}
