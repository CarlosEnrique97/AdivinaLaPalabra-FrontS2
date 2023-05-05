import { Component, OnInit } from '@angular/core';

import {
  LetterStatus,
  Palabra,
  DataDialog,
} from '../../../../interfaces/palabra';

import { GameService } from 'src/app/services/game.service';

import { TECLADO } from 'src/assets/datos/datos';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';

import { DialogFinishComponent } from 'src/app/components/dialog-finish/dialog-finish.component';

@Component({
  selector: 'app-main',

  templateUrl: './main.component.html',

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  word = ['', '', '', '', ''];

  letterStatus: LetterStatus[] = [];

  wordStatus: string[] = [];

  positionInput = 0;

  wordSend: Palabra = {
    pos0: '',

    pos1: '',

    pos2: '',

    pos3: '',

    pos4: '',
  };

  disableKeyboard: boolean = false;

  teclado: string[] = TECLADO;

  tecladoStatus: string[] = [];

  isDelete = true;

  emptyLetter = '';

  tries: boolean = true;

  dataDialog: DataDialog = {
    title: '',
    text: '',
    correctWord: '',
    button: '',
  };

  winValue = true;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.$disableKeyboard.subscribe({
      next: (response: boolean) => {
        this.disableKeyboard = response;
      },
    });
  }

  sendWord() {
    this.gameService.getWordIfExist(this.word.join('')).subscribe({
      next: (response: any) => {
        if (!response.wordExists) {
          this.openDialogNoExist();
          return;
        }
        this.validatePosition();
      },
    });
  }

  writeLetter(tecla: string) {
    if (this.findCorrectIndex() === -1) return;
    this.word[this.positionInput] = tecla;
    this.positionInput = this.findCorrectIndex();
  }
  
  deleteLetter() {
    this.changePositionWhenDelete();
    this.word[this.positionInput] = '';
  }

  getPosition(position: number) {
    this.positionInput = position;
  }

  private openDialogNoExist() {
    this.dialog.open(DialogComponent, {
      data: { text: 'La palabra no existe', createButton: true },
    });
  }

  private validatePosition() {
    this.setValuesWord();
    this.gameService.getValidatePosition(this.wordSend).subscribe({
      next: (response: LetterStatus[]) => {
        this.letterStatus = response;
        this.setStatus();
        this.setTecladoStatus();
        this.checkWin();
      },
    });
  }

  private setStatus() {
    for (let i = 0; i < this.letterStatus.length; i++) {
      this.wordStatus[i] = this.letterStatus[i].status;
    }
  }

  private setTecladoStatus() {
    this.letterStatus.forEach((posicion) => {
      const index = this.teclado.findIndex((value) => {
        return value.toLowerCase() === posicion.letter;
      });
      if (this.tecladoStatus[index] !== 'MATCHED') {
        this.tecladoStatus[index] = posicion.status;
      }
    });
  }

  private findCorrectIndex() {
    return this.word.findIndex((value) => {
      return value === '';
    });
  }

  private changePositionWhenDelete() {
    if (this.word[this.positionInput] !== '') {
      return;
    }
    if (this.positionInput > this.word.length - 1 || this.positionInput < 0) {
      this.positionInput = this.word.length - 1;
      return;
    }
    if (this.positionInput > 0) {
      this.positionInput--;
      return;
    }
  }

  private setValuesWord() {
    this.wordSend.pos0 = this.word[0];
    this.wordSend.pos1 = this.word[1];
    this.wordSend.pos2 = this.word[2];
    this.wordSend.pos3 = this.word[3];
    this.wordSend.pos4 = this.word[4];
  }

  private checkWin() {
    this.winValue = true;
    this.wordStatus.forEach((value) => {
      if (value != 'MATCHED') this.winValue = false;
    });
    if (this.winValue) {
      this.decideWinorLost('');
      return;
    }
    this.checkTries();
  }

  private checkTries() {
    this.gameService.getAttempts().subscribe({
      next: (response: any) => {
        if (!response.canMoreAttempts) {
          this.gameLost();
        }
      },
    });
  }

  private gameLost() {
    let correctWord = '';
    this.gameService.getCorrectWord().subscribe({
      next: (response: any) => {
        correctWord = response.correctWord;
        this.decideWinorLost(correctWord);
      },
    });
  }

  private decideWinorLost(correctword: string) {
    if (this.winValue) {
      this.dataDialog.title = 'Has ganado!!!';
      this.dataDialog.text =
        'Enhorabuena has acertado con la palabra, pero... ¿podrás con la siguiente?';
      this.dataDialog.correctWord = correctword;
      this.dataDialog.button = '¿Te atreves a otra partida piltrafilla?';
      this.dialog.open(DialogFinishComponent, {
        data: this.dataDialog,
      });
      this.disableKeyboardChange();
      return;
    }
    this.dataDialog.title = 'Has perdido!!!';
    this.dataDialog.text =
      'Has perdido una partida más looser, espabila!!!, la palabra correcta era';
    this.dataDialog.correctWord = correctword;
    this.dataDialog.button = '¿Que tal looser, lo vuelves a intentar?';

    this.dialog.open(DialogFinishComponent, {
      data: this.dataDialog,
    });
    this.disableKeyboardChange();
  }

  private disableKeyboardChange() {
    this.gameService.$disableKeyboard.next(true);
  }
}
