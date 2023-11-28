import { Component } from '@angular/core';

import { IState } from 'src/typescript/interfaces/general-interfaces';
import { TransitionType, StepType } from 'src/typescript/enums';

import { StoreService } from '../../services/globalState/store.service';

@Component({
  selector: 'app-views-router',
  templateUrl: './panels-router.component.html',
  styleUrls: ['./panels-router.component.css'],
})
export class ViewsRouterComponent {
  public allStepTypes = StepType;
  public currentStepType?: StepType;

  public allTransitionTypes = TransitionType;
  public currentTransitiontype?: TransitionType;

  constructor(private globalStateService: StoreService) {
    this.globalStateService.sharedState$.subscribe((value: IState) => {
      this.currentStepType = value.currentGameStep.currentStepType;
      this.setTransition(value.currentGameStep.currentStepType);
    });
  }

  ngOnInit(): void {
    this.currentTransitiontype =
      this.globalStateService.getState().currentGameStep.currentTransitiontype;
  }

  setTransition(currentStepType: StepType) {
    switch (currentStepType) {
      case StepType.Introduction: {
        return;
      }
      case StepType.Choice: {
        setTimeout(() => {
          this.currentTransitiontype = TransitionType.Choice;
        }, 2000);
        return;
      }
      case StepType.Game: {
        return;
      }
      default:
        return;
    }
  }
}
