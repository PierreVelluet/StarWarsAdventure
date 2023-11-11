import { Injectable } from '@angular/core';
import { IGameStep, IState } from 'src/typescript/interfaces/state-interface';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

import steps from '../../gameSteps.json';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private state: IState;
  private gameSteps: IGameStep[];
  constructor() {
    this.gameSteps = steps;
    this.state = {
      loading: false,
      character: null,
      gameStep: this.gameSteps[0],
    };
  }
  public getState(): IState {
    return this.state;
  }

  public setState(newState: any): void {
    this.state = newState;
  }

  public setStateWithStarwasEntity(
    obj: IStarwarsEntity,
    advance: boolean
  ): void {
    const newState: IState = {
      ...this.state,
      [this.state.gameStep?.associatedStarwarsEntity]: obj,
    };

    if (advance) {
      const actualGameStep: IGameStep | undefined = this.gameSteps.find(
        (x) => x.associatedStarwarsEntity == obj.type
      );

      const currentStepId: number = actualGameStep?.id ?? -1;
      if (currentStepId < 0 || currentStepId == 3) return;

      const nextStepId: number = currentStepId + (advance ? 1 : -1);
      newState.gameStep = this.gameSteps[nextStepId];
    }

    console.log('new global state is', newState);

    this.setState(newState);
  }
}
