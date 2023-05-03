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

    pos4: '',
  };

  disableKeyboard: boolean = false;

  teclado: string[] = TECLADO;

  tecladoStatus: string[] = [];

  isDelete = true;

  emptyLetter = '';

  round: Rounds = {
    wordRound: ['', '', '', '', ''],
    wordStatusRound: [],
    tecladoStatusRound: [],
  }

  rounds: Rounds[] = [this.round];

  word = this.round.wordRound;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.$disableKeyboard.subscribe({
      next: (response: boolean) => {
        this.disableKeyboard = response;
      },
    });
    this.checkWin();
    console.log(this.rounds)
  }

  sendWord() {
    console.log(this.word);
    this.gameService.getWordIfExist(this.word.join('')).subscribe({
      next: (response: any) => {
        if (!response.wordExists) {
          this.openDialog();
          return;
        }
        this.validatePosition();
      },
    });
    this.newRound()
  }

  writeLetter(tecla: string) {
    this.word[this.positionInput] = tecla;
    this.positionInput = this.findCorrectIndex();
    console.log(this.positionInput+ " Posicion Selecionada sin Raton")
  }

  getPosition(position: number) {
    this.positionInput = position;
    console.log(this.positionInput+ " Posicion Selecionada Con Raton")
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

  changePositionWhenDelete() {
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

  newRound(){
    this.word = ['', '', '', '', '']
    let newRound: Rounds = {
      wordRound: this.word,
      wordStatusRound: this.wordStatus,
      tecladoStatusRound: this.tecladoStatus
    }
    if(this.rounds.length < 5){
      this.rounds.push(newRound)
    }else{
      alert("Has palmado")
    }
   console.log(this.rounds)
  }
}
