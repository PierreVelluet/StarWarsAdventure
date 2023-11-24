import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IGameStep, IState } from 'src/typescript/interfaces/state-interface';
import steps from '../../gameSteps.json';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
import { ChangeStepDirection } from 'src/typescript/enums';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private gameSteps: IGameStep[];
  private generalState: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    loading: false,
    character: null,
    droid: null,
    vehicle: null,
    location: null,
    gameStep: steps[0],
  });
  globalSharedState$: Observable<IState> = this.generalState.asObservable();

  constructor() {
    this.gameSteps = steps;
  }

  public getGeneralState(): IState {
    return this.generalState.getValue();
  }

  public changeStep(direction: ChangeStepDirection) {
    const newState: IState = {
      ...this.generalState.value,
      gameStep: this.gameSteps[this.generalState.value.gameStep.id + direction],
    };
    this.generalState.next(newState);
    console.log('newState', newState);
  }

  public updateEntityAndMoveNextStep(
    entityName: string,
    entityValue: IStarwarsEntity
  ): void {
    const newState: IState = {
      ...this.generalState.value,
      [entityName]: entityValue,
      gameStep: this.gameSteps[this.generalState.value.gameStep.id + 1],
    };

    this.generalState.next(newState);
    console.log('newState', newState);
  }
}
