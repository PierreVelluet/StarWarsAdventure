import { Component } from '@angular/core';

import { IState } from 'src/typescript/interfaces/general-interfaces';
import { StepType } from 'src/typescript/enums';

import { StoreService } from '../../services/globalState/store.service';

@Component({
  selector: 'app-views-router',
  templateUrl: './panels-router.component.html',
  styleUrls: ['./panels-router.component.css'],
})
export class ViewsRouterComponent {
  public allStepTypes = StepType;
  public currentStepType: StepType = StepType.Introduction;
  public transitionProcessed: boolean = false;

  constructor(private globalStateService: StoreService) {
    this.globalStateService.sharedState$.subscribe((value: IState) => {
      if (value.currentGameStep.type == this.currentStepType) return;

       this.currentStepType = value.currentGameStep.type;
      if (this.currentStepType == StepType.Choice) {
        setTimeout(() => {
        
          this.transitionProcessed = true;
        }, 2000);
      }
    });
  }
}
