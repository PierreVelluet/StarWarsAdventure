import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
import { LoadingStateService } from 'src/app/services/globalState/loading-state.service';

import { UtilsService } from '../../services/utils/utils.service';
import { ChoosingModalComponent } from '../choosing-modal/choosing-modal.component';

@Component({
  selector: 'app-choosing-card',
  templateUrl: './choosing-card.component.html',
  styleUrls: ['./choosing-card.component.css'],
  standalone: true,
  imports: [MatCardModule, CommonModule, LazyLoadImageModule],
})
export class ChoosingCardComponent {
  hovered: boolean;
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
    this.trimedDescription = '';
    this.lazyLoadImage = '';
    this.defaultImage = '/assets/images/placeHolder.png';
    this.imageToShowOnError = '/assets/images/error.png';
    loadingStateService.loadingObs$.subscribe(
      (value) => (this.isLoading = value)
    );
  }

  @Input() public obj!: IStarwarsEntity;
  @Input() public isClickPrevented!: boolean;

  @Output() chosenObject: EventEmitter<IStarwarsEntity> = new EventEmitter();

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

  public hoverHandler(): void {
    this.hovered = !this.hovered;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChoosingModalComponent, {
      disableClose: true,
      autoFocus: true,
      data: this.obj,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      this.chosenObject.emit(this.obj);
    });
  }
}
