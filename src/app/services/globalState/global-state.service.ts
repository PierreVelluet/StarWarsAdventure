import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IGameStep, IState } from 'src/typescript/interfaces/state-interface';
import steps from '../../gameSteps.json';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

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
