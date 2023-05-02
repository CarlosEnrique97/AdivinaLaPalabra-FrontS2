import { Component, OnInit } from '@angular/core';
import { LetterStatus, Palabra } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';

import { TECLADO, WINVALUE } from 'src/assets/datos/datos';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { DialogWinComponent } from 'src/app/components/dialogWin/dialog-win.component';

@Component({
  selector: 'app-main',

  templateUrl: './main.component.html',

  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  word = ['', '', '', '', ''];

  letterStatus: LetterStatus[] = [];

  wordStatus: string[] = [];

  winValue = WINVALUE;

  positionInput = 0;

  wordSend: Palabra = {
    pos0: '',

    pos1: '',

    pos2: '',

    pos3: '',

    pos4: '',
  };

  disableKeyboard: boolean = false;

  keyboard: string[] = TECLADO; 

  tecladoStatus: string[] = [];

  isDelete = true;

  emptyLetter = '';

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.$disableKeyboard.subscribe({
      next: (response: boolean) => {
        this.disableKeyboard = response;
      },
    });
    this.checkWin();
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
  }

  saveLetterStatusKeyboard(){
    let i = 0;
    let status: string[] = this.status.split(",")
    this.keyboard.forEach((x) => {
    this.statusKeyboard.push(this.checkStatusKey(x,this.letterStatus[i],status[i]))
      i++;
    })
  }

  writeLetter(tecla: string) {
    this.word[this.positionInput] = tecla;
    this.positionInput = this.findCorrectIndex();
  }


  getPosition(position: number) {
    this.positionInput = position;
  }

  private checkStatusKey(letter: string, letterStatus: LetterStatus, status: string): KeyBoardStatus{
    if(letter === letterStatus.letter && letterStatus.status === status){
      return this.keyStatus = {
        letter: letter,
        status: status
      }
    };
    return this.keyStatus = {
      letter: "",
      status: ""
    };
  }

  private openDialog(data: string) {
    this.dialog.open(DialogComponent, {
      data: { text: data, createButton: false, textBtn: "Recargar" },
    });
  }

  private openDialogWin(data: string) {
    this.dialog.open(DialogWinComponent, {
      data: { text: data, createButton: true, textBtn: "¿Te atreves a otra partida piltrafilla?"},
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
        return value === posicion.letter;
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

  deleteLetter() {
    this.changePositionWhenDelete();
    this.word[this.positionInput] = '';
  }

  setValuesWord() {
    this.wordSend.pos0 = this.word[0];
    this.wordSend.pos1 = this.word[1];
    this.wordSend.pos2 = this.word[2];
    this.wordSend.pos3 = this.word[3];
    this.wordSend.pos4 = this.word[4];
  }

  checkWin() {
    let resultado = this.wordStatus.join(',');

    if (resultado.toLocaleUpperCase() === this.winValue) {
      this.openDialogWin(
        'Enhorabuena has acertado la palabra, pero... ¿podrás con la siguiente?'
      );
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
}
