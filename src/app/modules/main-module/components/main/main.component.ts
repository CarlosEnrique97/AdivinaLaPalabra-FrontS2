import { Component, OnInit } from '@angular/core';

import { LetterStatus, Palabra, Rounds } from '../../../../interfaces/palabra';

import { GameService } from 'src/app/services/game.service';

import { TECLADO } from 'src/assets/datos/datos';

import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DialogWinComponent } from 'src/app/components/dialog-win/dialog-win.component';
import { DialogLostComponent } from 'src/app/components/dialog-lost/dialog-lost.component';

@Component({
  selector: 'app-main',

  templateUrl: './main.component.html',

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
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
    positionInput: 0
  };

  rounds: Rounds[] = [this.round];

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
          this.openDialogNoExist();
          return;
        }
        this.validatePosition();
      },
    });
    this.newRound();
    this.contRound++;
  }

  writeLetter(tecla: string) {
    const positionLetterRound = this.rounds[this.contRound].positionInput;
    this.rounds[this.contRound].wordRound[positionLetterRound] = tecla;
    this.rounds[this.contRound].positionInput = this.findCorrectIndex();
  }

  getPosition(idCasilla: number, idRound: number) {
    if(idRound !== this.contRound) return;
    this.rounds[this.contRound].positionInput = idCasilla;
  }

  deleteLetter() {
    this.changePositionWhenDelete();
    this.word[this.rounds[this.contRound].positionInput] = '';
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
    this.letterStatus.forEach((value,index) =>{
      this.rounds[this.contRound].wordStatusRound[index] = value.status
    })
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
    return this.word.findIndex((value) => {
      return value === '';
    });
  }

  private changePositionWhenDelete() {
    const positionLetter = this.rounds[this.contRound].positionInput;
8
    if (this.word[positionLetter] !== '') {
      return;
    }
    if (positionLetter > this.word.length - 1 || positionLetter < 0) {
      this.rounds[this.contRound].positionInput = this.word.length - 1;
      return;
    }
    if (positionLetter > 0) {
      this.rounds[this.contRound].positionInput--;
      return;
    }
  }

  private setValuesWord() {
    Object.keys(this.wordSend).forEach((key, index) => {
      this.wordSend[key as keyof Palabra] = this.rounds[this.contRound].wordRound[index];
    }); 
  }

  checkWin() {
    let winValue = true;
    this.wordStatus.forEach((value) => {
      if (value != 'MATCHED') winValue = false;
    });
    if (winValue) {
      this.dialog.open(DialogWinComponent);
      this.gameService.$disableKeyboard.next(true);
      return;
    }
    this.checkTries();
  }

  checkTries() {
    this.gameService.getAttempts().subscribe({
      next: (response: any) => {
        if (!response.canMoreAttempts) {
          this.gameLost();
        }
      },
    });
  }

  private newRound() {
    this.word = ['', '', '', '', ''];
    this.wordStatus = ['', '', '', '', ''];
    let newRound: Rounds = {
      wordRound: this.word,
      wordStatusRound: this.wordStatus,
      positionInput: 0
    };
      this.rounds.push(newRound);
  }
  
  gameLost() {
    let correctWord = '';
    this.gameService.getCorrectWord().subscribe({
      next: (response: any) => {
        correctWord = response.correctWord;
        this.dialog.open(DialogLostComponent, {
          data: { text: correctWord },
        });
      },
    });
    this.gameService.$disableKeyboard.next(true);
  }
}
