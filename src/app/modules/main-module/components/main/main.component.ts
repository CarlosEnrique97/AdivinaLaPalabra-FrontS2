import { Component, OnInit } from '@angular/core';
import { LetterStatus, Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';
import { TECLADO } from 'src/assets/datos/datos';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  palabraModel: Palabra = {
    pos0: '',
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: '',
  };

  word = Object.values(this.palabraModel);
  letterStatus: LetterStatus[] = [];
  wordStatus: number[] = [];
  wordSend = '';
  disableKeyboard: boolean = false;
  teclado: string[] = TECLADO;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  wordComplete = this.palabraModel.toString();

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.getDisable().subscribe({
      next: (response: any) => {
        this.disableKeyboard = response;
      },
    });
  }

  sendWord() {
    this.gameService.getWordIfExist(this.buildWord()).subscribe({
      next: (response: any) => {
        if (response.wordExists) {
          this.gameService.getValidatePosition(this.palabraModel).subscribe({
            next: (response: LetterStatus[]) => {
              this.letterStatus = response;
            },
          });
        } else {
          this.openDialog();
        }
      },
    });
    this.letterStatus.forEach((x) => this.wordStatus.push(x.status));
  }

  writeLetter(tecla: string) {
    if (this.palabraModel.pos0 === '') {
      this.palabraModel.pos0 = tecla;
    } else if (this.palabraModel.pos1 === '') {
      this.palabraModel.pos1 = tecla;
    } else if (this.palabraModel.pos2 === '') {
      this.palabraModel.pos2 = tecla;
    } else if (this.palabraModel.pos3 === '') {
      this.palabraModel.pos3 = tecla;
    } else if (this.palabraModel.pos4 === '') {
      this.palabraModel.pos4 = tecla;
    }

    this.word = Object.values(this.palabraModel);
  }

  deleteLetter() {
    if (this.palabraModel.pos4) {
      this.palabraModel.pos4 = '';
    } else if (this.palabraModel.pos3) {
      this.palabraModel.pos3 = '';
    } else if (this.palabraModel.pos2) {
      this.palabraModel.pos2 = '';
    } else if (this.palabraModel.pos1) {
      this.palabraModel.pos1 = '';
    } else if (this.palabraModel.pos0) {
      this.palabraModel.pos0 = '';
    }

    this.word = Object.values(this.palabraModel);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { text: 'La palabra no existe', createButton: true },
    });
  }

  focus() {
    alert('hola');
  }

  buildWord() {
    return (this.wordSend =
      this.palabraModel.pos0 +
      this.palabraModel.pos1 +
      this.palabraModel.pos2 +
      this.palabraModel.pos3 +
      this.palabraModel.pos4);
  }

  // getInputColor {
  //   if (status == 1) return 'green';
  //   else if (status == 2) return 'yellow';
  //   else return 'grey';
  // }
}
