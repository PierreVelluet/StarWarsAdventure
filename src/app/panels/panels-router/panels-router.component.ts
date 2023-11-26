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
  public currentStepType?: StepType;

  constructor(private globalStateService: StoreService) {
    this.globalStateService.sharedState$.subscribe((value: IState) => {
      this.currentStepType = value.currentGameStep.type;
    });
  }
}
