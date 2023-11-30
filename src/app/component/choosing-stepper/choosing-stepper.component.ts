import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { IGameStep } from 'src/typescript/interfaces/general-interfaces';
import { StepType } from 'src/typescript/enums';

import { StoreService } from '../../services/globalState/store.service';
import { gameSteps } from 'src/utils/staticDatas';

@Component({
  selector: 'app-choosing-stepper',
  templateUrl: './choosing-stepper.component.html',
  styleUrls: ['./choosing-stepper.component.css'],
  standalone: true,
  imports: [MatStepperModule, CommonModule, MatIconModule],
})
export class ChoosingStepper {
  public gameSteps: IGameStep[];

  @ViewChild('stepper') stepper!: MatStepper;

  constructor(private globalStateService: StoreService) {
    this.gameSteps = gameSteps?.filter(
      (el: IGameStep) => el.currentStepType == StepType.Choice
    );
  }

  ngAfterViewInit(): void {
    // Workaround for next macrotask to be executed.
    // "https://stackoverflow.com/questions/71978152/how-can-i-fix-this-specific-ng0100-expressionchangedafterithasbeencheckederror"
    setTimeout(() => {
      this.globalStateService.sharedState$.subscribe((value) => {
        if (value.currentGameStep.currentStepType == StepType.Choice) {
          (this.stepper.selectedIndex = value.currentGameStep.id - 1),
            this.gameSteps.forEach(
              (el: IGameStep) =>
                (el.completed = el.id < this.stepper.selectedIndex + 1)
            );
        } else {
          this.gameSteps.forEach((el: IGameStep) => (el.completed = true));
        }
      });
    });
  }
}
