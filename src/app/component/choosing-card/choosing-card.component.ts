import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {
  ICharacter,
  IVehicle,
  IStarwarsEntity,
} from 'src/typescript/interfaces/starwars-interfaces';
import { CommonModule } from '@angular/common';

import { UtilsService } from '../../services/utils.service';
import { ChoosingModalComponent } from '../choosing-modal/choosing-modal.component';

import { LoadingStateService } from 'src/app/services/globalState/loading-state.service';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-choosing-card',
  templateUrl: './choosing-card.component.html',
  styleUrls: ['./choosing-card.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, LazyLoadImageModule],
})
export class ChoosingCardComponent {
  hovered: boolean;
  startHide: boolean;
  trimedDescription: string;
  lazyLoadImage: string;
  defaultImage: string;
  imageToShowOnError: string;
  public isLoading: boolean = false;
  constructor(
    private utilsService: UtilsService,
    public dialog: MatDialog,
    private loadingStateService: LoadingStateService
  ) {
    this.hovered = false;
    this.startHide = false;
    this.trimedDescription = '';
    this.lazyLoadImage = '';
    this.defaultImage = '/assets/images/placeHolder.png';
    this.imageToShowOnError = '/assets/images/error.png';
    loadingStateService.loadingObs$.subscribe(
      (value) => (this.isLoading = value)
    );
  }

  @Input() public obj!: IStarwarsEntity;

  @Output() chosenObject: EventEmitter<ICharacter | IVehicle> =
    new EventEmitter();

  public ngOnInit(): void {
    // Ensure the input bindings are actually provided at run-time
    this.assertInputsProvided();
    this.lazyLoadImage = this.obj.image;

    this.trimedDescription = this.utilsService.trimString(
      this.obj.description,
      250
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
