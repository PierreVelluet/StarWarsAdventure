import { Component } from '@angular/core';

import { IState } from 'src/typescript/interfaces/state-interface';
import { StepType } from 'src/typescript/enums';

import { GlobalStateService } from '../../services/globalState/global-state.service';

@Component({
  selector: 'app-views-router',
  templateUrl: './panels-router.component.html',
  styleUrls: ['./panels-router.component.css'],
})
export class ViewsRouterComponent {
  public allStepTypes = StepType;
  public currentStepType?: StepType;

  constructor(private globalStateService: GlobalStateService) {
    this.globalStateService.globalSharedState$.subscribe((value: IState) => {
      this.currentStepType = value.gameStep.type;
    });
  }
}
