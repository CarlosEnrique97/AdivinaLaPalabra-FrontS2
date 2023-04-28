import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-win',

  templateUrl: './dialog-win.component.html',

  styleUrls: ['./dialog-win.component.scss'],
})
export class DialogWinComponent {
  winGameMessage:string = 'Enhorabuena has acertado la palabra, pero... ¿podrás con la siguiente?';

  createButton = true;

  buttonNextGame:string = '¿Te atreves a otra partida piltrafilla?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWinComponent) {}

  ngOnInit() {
    this.winGameMessage = this.data.winGameMessage;

    this.createButton = this.data.createButton;

    this.buttonNextGame = this.data.buttonNextGame;
  }

  refresh() {
    window.location.reload();
  }
}
