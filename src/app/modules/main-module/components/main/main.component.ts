import { Component, OnInit } from '@angular/core';
import { Palabra } from '../../../../interfaces/palabra';
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
  palabraModel: Palabra = {
    nombre: '',
  };

  disableKeyboard: boolean = false;
  teclado: string[] = TECLADO;
  inicioPalabra: number = 0;
  finPalabra: number = -1;

  constructor(private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit() {
    this.gameService.getDisable().subscribe({
      next: (response: any) => {
        this.disableKeyboard = response;
      },
    });
  }

  sendWord() {
    this.gameService.getWordIfExist(this.palabraModel.nombre).subscribe({
      next: (response: any) => {
        if (response.wordExists) return;
        this.openDialog();
      },
    });
  }

  sendLetter(tecla: string) {
    if (this.palabraModel.nombre.length >= 5) return;
    this.palabraModel.nombre += tecla;
  }

  deleteLetter() {
    this.palabraModel.nombre = this.palabraModel.nombre.slice(
      this.inicioPalabra,
      this.finPalabra
    );
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: { text: 'La palabra no existe', createButton: true },
    });
  }
}
