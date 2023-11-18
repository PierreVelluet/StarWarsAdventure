import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  ICharacter,
  IStarship,
  IStarwarsEntity,
} from 'src/typescript/interfaces/starwars-interfaces';
import { CommonModule } from '@angular/common';

import { UtilsService } from '../services/utils.service';
import { ChoosingModalComponent } from '../choosing-modal/choosing-modal.component';

@Component({
  selector: 'app-choosing-card',
  templateUrl: './choosing-card.component.html',
  styleUrls: ['./choosing-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class ChoosingCardComponent {
  hovered: boolean;
  startHide: boolean;
  trimedDescription: string;
  constructor(private utilsService: UtilsService, public dialog: MatDialog) {
    this.hovered = false;
    this.startHide = false;
    this.trimedDescription = '';
  }

  @Input() public obj!: IStarwarsEntity;

  @Output() chosenObject: EventEmitter<ICharacter | IStarship> =
    new EventEmitter();

  public ngOnInit(): void {
    // Ensure the input bindings are actually provided at run-time
    this.assertInputsProvided();

    this.trimedDescription = this.utilsService.trimString(
      this.obj.description,
      150
    );
  }

  private assertInputsProvided(): void {
    if (!this.obj) {
      throw new Error(`The required obj was not provided`);
    }
  }

  public async hoverHandler(): Promise<void> {
    if (this.hovered) {
      this.startHide = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.startHide = false;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    this.hovered = !this.hovered;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChoosingModalComponent, {
      disableClose: true,
      autoFocus: true,
      data: this.obj,
      panelClass: ['animate__animated', 'animate__pulse'],
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      this.chosenObject.emit(this.obj);
    });
  }
}
