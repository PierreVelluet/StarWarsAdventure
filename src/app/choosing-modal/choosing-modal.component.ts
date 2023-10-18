import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

@Component({
  selector: 'app-choosing-modal',
  templateUrl: './choosing-modal.component.html',
  styleUrls: ['./choosing-modal.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ChoosingModalComponent {
  dataFromModal: boolean;
  constructor(
    public dialogRef: MatDialogRef<ChoosingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IStarwarsEntity
  ) {
    this.dataFromModal = false;
  }

  save(bool: boolean) {
    this.dialogRef.close(bool);
  }
}
