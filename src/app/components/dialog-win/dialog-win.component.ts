import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-win',

  templateUrl: './dialog-win.component.html',

  styleUrls: ['./dialog-win.component.scss'],
})
export class DialogWinComponent {
  text:string = 'Enhorabuena has acertado la palabra, pero... ¿podrás con la siguiente?';

  createButton = true;

  textBtn:string = '¿Te atreves a otra partida piltrafilla?';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogWinComponent) {}

  ngOnInit() {
    this.text = this.data.text;

    this.createButton = this.data.createButton;

    this.textBtn = this.data.textBtn;
  }

  refresh() {
    window.location.reload();
  }
}
