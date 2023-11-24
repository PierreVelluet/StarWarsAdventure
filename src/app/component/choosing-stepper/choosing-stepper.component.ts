import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

import { IGameStep } from 'src/typescript/interfaces/state-interface';
import { StepType } from 'src/typescript/enums';

import { UtilsService } from '../../services/utils.service';
import { GlobalStateService } from '../../services/globalState/global-state.service';
import steps from '../../gameSteps.json';

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

  constructor(
    private utilsService: UtilsService,
    private globalStateService: GlobalStateService
  ) {
    this.gameSteps = steps?.filter(
      (el: IGameStep) => el.type == StepType.Choice
    );
  }

  ngAfterViewInit(): void {
    // Workaround for next macrotask to be executed.
    // "https://stackoverflow.com/questions/71978152/how-can-i-fix-this-specific-ng0100-expressionchangedafterithasbeencheckederror"
    setTimeout(() => {
      this.globalStateService.globalSharedState$.subscribe((value) => {
        if (value.gameStep.type == StepType.Choice) {
          (this.stepper.selectedIndex = value.gameStep.id - 1),
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
