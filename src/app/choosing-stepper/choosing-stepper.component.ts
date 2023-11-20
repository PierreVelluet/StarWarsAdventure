import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

import { IGameStep, IState } from 'src/typescript/interfaces/state-interface';

import { UtilsService } from '../services/utils.service';
import { GlobalStateService } from '../services/globalState/global-state.service';
import steps from '../gameSteps.json';

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
  ],
})
export class ChoosingStepper {
  public gameSteps: IGameStep[];
  public currentStep: IGameStep;

  constructor(
    private utilsService: UtilsService,
    private globalStateService: GlobalStateService
  ) {
    this.currentStep = this.globalStateService.getGeneralState().gameStep;
    this.gameSteps = this.formateStepsForStepper();
  }

  ngOnInit() {
    this.globalStateService.globalSharedState$.subscribe((res: IState) => {
      this.gameSteps = this.formateStepsForStepper();
    });
  }

  private formateStepsForStepper(): IGameStep[] {
    return steps?.map((el: IGameStep) => {
      return {
        ...el,
        associatedStarwarsEntity: this.utilsService?.capitalize(
          el?.associatedStarwarsEntity
        ),
        completed:
          el.id < this.globalStateService.getGeneralState().gameStep.id,
      };
    });
  }
}
