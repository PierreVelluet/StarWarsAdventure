import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { IGameStep } from 'src/typescript/interfaces/state-interface';

import { UtilsService } from '../../services/utils.service';
import { GlobalStateService } from '../../services/globalState/global-state.service';
import steps from '../../gameSteps.json';

@Component({
  selector: 'app-choosing-stepper',
  templateUrl: './choosing-stepper.component.html',
  styleUrls: ['./choosing-stepper.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
  ],
})
export class ChoosingStepper {
  public gameSteps: IGameStep[];
  public currentStep!: IGameStep;

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private utilsService: UtilsService,
    private globalStateService: GlobalStateService
  ) {
    this.gameSteps = this.formatStepsForStepper();
  }

  ngAfterViewInit() {
    this.globalStateService.globalSharedState$.subscribe((value) => {
      if (value.gameStep.associatedStarwarsEntity) {
        (this.stepper.selectedIndex = value.gameStep.id),
          this.gameSteps.forEach(
            (el: IGameStep) =>
              (el.completed = el.id < this.stepper.selectedIndex)
          );
      } else {
        this.gameSteps.forEach((el: IGameStep) => (el.completed = true));
      }
    });
  }

  private formatStepsForStepper(): IGameStep[] {
    return steps
      ?.filter((el: IGameStep) => el?.associatedStarwarsEntity)
      .map((el: IGameStep) => {
        return {
          ...el,
          associatedStarwarsEntity: this.utilsService?.capitalize(
            el?.associatedStarwarsEntity
          ),
        };
      });
  }
}
