import { Component, OnInit } from '@angular/core';
import { LetterStatus } from '../../../../interfaces/palabra';
import { GameService } from 'src/app/services/game.service';
import { TECLADO } from 'src/assets/datos/datos';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  word = ['', '', '', '', ''];
  letterStatus: LetterStatus[] = [];
  wordStatus: number[] = [];
  posicionInput = 0;
  wordSend = '';
  disableKeyboard: boolean = false;
  teclado: string[] = TECLADO;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.$disableKeyboard.subscribe({
      next: (response: boolean) => {
        this.disableKeyboard = response;
      },
    });
  }

  sendWord() {
    this.gameService.getWordIfExist(this.word).subscribe({
      next: (response: any) => {
        if (!response.wordExists) this.openDialog();
        this.validatePosition();
      },
    });
  }

  validatePosition() {
    this.gameService.getValidatePosition().subscribe({
      next: (response: LetterStatus[]) => {
        console.log(response);
      },
    });
  }

  writeLetter(tecla: string) {
    for (let index = 0; index <= 4; index++) {
      if (this.word[index] === '' && this.posicionInput === index) {
        this.word[index] = tecla;
        for (let index = 0; index <= 4; index++) {
          if (this.word[index] === '') {
            this.posicionInput = index;
            break;
          }
        }
        break;
      }
    }
    if (this.posicionInput > 4) {
      this.posicionInput = 4;
    }
  }

  deleteLetter() {
    this.word[this.posicionInput] = '';
    this.posicionInput--;
    if (this.posicionInput < 0) {
      this.posicionInput = 0;
    }
  }

  getPosition(position: number) {
    this.posicionInput = position;
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { text: 'La palabra no existe', createButton: true },
    });
  }
}
