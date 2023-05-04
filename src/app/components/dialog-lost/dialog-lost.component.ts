import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-lost',
  templateUrl: './dialog-lost.component.html',
  styleUrls: ['./dialog-lost.component.scss'],
})
export class DialogLostComponent {
  LostMessage: string = 'Has perdido una partida más looser, espabila!!!';

  createButton = true;

  buttonNextGame: string = '¿Te atreves a otra partida piltrafilla?';

  correctWord="";
  text = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogLostComponent) {}

  ngOnInit() {
    this.correctWord = this.data.text;
  }

  refresh() {
    window.location.reload();
  }
}
