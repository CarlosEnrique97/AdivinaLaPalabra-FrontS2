import { Component, OnInit } from '@angular/core';

import { LetterStatus, Palabra, Rounds } from '../../../../interfaces/palabra';

import { GameService } from 'src/app/services/game.service';

import { TECLADO, WINVALUE } from 'src/assets/datos/datos';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';

import { DialogWinComponent } from 'src/app/components/dialog-win/dialog-win.component';

@Component({
  selector: 'app-main',

  templateUrl: './main.component.html',

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  letterStatus: LetterStatus[] = [];

  wordStatus: string[] = [];

  winValue = WINVALUE;

  positionInput = 0;

  wordSend: Palabra = {
    pos0: '',
    pos1: '',
    pos2: '',
    pos3: '',
    pos4: ''
  };

  positionSelec: number = 0;

  contRound = 0;

  disableKeyboard: boolean = false;

  teclado: string[] = TECLADO;

  tecladoStatus: string[] = [];

  isDelete = true;

  emptyLetter = '';

  round: Rounds = {
    wordRound: ['', '', '', '', ''],
    wordStatusRound: [],
    positionInput: 0,
  };

  rounds: Rounds[] = [this.round];

  positionRoundLetter: number = 0;

  word = this.round.wordRound;

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
          this.openDialog();
          return;
        }
        this.validatePosition();
      },
    });
    this.setValuesWord()
  }

  writeLetter(tecla: string) {
    this.word[this.positionRoundLetter] = tecla;
    this.positionRoundLetter = this.findCorrectIndex();
  }

  getPosition(idCasilla: number, idRound: number) {
    if (idRound !== this.contRound) return;
    this.rounds[this.contRound].positionInput = idCasilla;
    this.positionRoundLetter = this.rounds[this.contRound].positionInput;
  }

  deleteLetter() {
    this.changePositionWhenDelete();
    this.word[this.positionRoundLetter] = '';
  }

  private openDialog() {
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
    this.letterStatus.forEach((value, index) => {
      this.rounds[this.contRound].wordStatusRound[index] = value.status;
    });
  }

  private setTecladoStatus() {
    this.letterStatus.forEach((posicion) => {
      const index = this.teclado.findIndex((value) => {
        return value.toLocaleLowerCase() === posicion.letter;
      });
      if (this.tecladoStatus[index] !== 'MATCHED') {
        this.tecladoStatus[index] = posicion.status;
      }
    });
  }

  private findCorrectIndex() {
    return this.rounds[this.contRound].wordRound.findIndex((value) => {
      return value === '';
    });
  }

  private changePositionWhenDelete() {
    if (
      this.rounds[this.contRound].wordRound[this.positionRoundLetter] !== ''
    ) {
      return;
    }
    if (
      this.positionRoundLetter > this.word.length - 1 ||
      this.positionRoundLetter < 0
    ) {
      this.positionRoundLetter = this.word.length - 1;
      return;
    }
    if (this.positionRoundLetter > 0) {
      this.positionRoundLetter--;
      return;
    }
  }

  private setValuesWord() {
    Object.keys(this.wordSend).forEach((key, index) => {
      this.wordSend[key as keyof Palabra] = this.rounds[this.contRound].wordRound[index];
    }); 
  }

  private checkWin() {
    let resultado = this.wordStatus.join(',');
    if (resultado.toLocaleUpperCase() === this.winValue) {
      this.openDialogWin(
        'Enhorabuena has acertado la palabra, pero... ¿podrás con la siguiente?'
      );
    } else {
      this.newRound();
      this.contRound++;
    }
  }

  private openDialogWin(data: string) {
    this.dialog.open(DialogWinComponent, {
      data: {
        text: data,
        createButton: true,
        textBtn: '¿Te atreves a otra partida piltrafilla?',
      },
    });
  }

  private newRound() {
    this.word = ['', '', '', '', ''];
    this.wordStatus = ['', '', '', '', ''];
    let newRound: Rounds = {
      wordRound: this.word,
      wordStatusRound: this.wordStatus,
      positionInput: 0,
    };
    this.rounds.push(newRound);
  }
}
