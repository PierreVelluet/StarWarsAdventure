import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IGameStep, IState } from 'src/typescript/interfaces/state-interface';
import steps from '../../gameSteps.json';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private gameSteps: IGameStep[];
  private generalState: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    loading: false,
    character: null,
    gameStep: steps[0],
  });
  globalSharedState$: Observable<IState> = this.generalState.asObservable();

  constructor() {
    this.gameSteps = steps;
  }

  public getGeneralState(): IState {
    return this.generalState.getValue();
  }

  public updateGeneralState(
    newKey: string,
    newValue: any,
    goNextStep: boolean
  ): void {
    const newState: IState = {
      ...this.generalState.value,
      [newKey]: newValue,
    };

    if (goNextStep) {
      const currentStepId: number = this.generalState.value.gameStep.id ?? -1;
      if (currentStepId < 0 || currentStepId == 3) return;

      const nextStepId: number = currentStepId + (goNextStep ? 1 : -1);
      newState.gameStep = this.gameSteps[nextStepId];
    }

    this.generalState.next(newState);
  }
}
