import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-win',

  templateUrl: './dialog-win.component.html',

  styleUrls: ['./dialog-win.component.scss'],
})
export class DialogWinComponent {
  text = '';

  createButton = true;

  textBtn = '';

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
