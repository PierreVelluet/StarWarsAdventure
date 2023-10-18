import { Injectable } from '@angular/core';
import { IState } from 'src/typescript/interfaces/state-interface';
import gameSteps from '../../gameSteps.json';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private state: IState;
  constructor() {
    this.state = {
      loading: false,
      character: null,
      gameStep: gameSteps[0],
    };
  }
  public getState(): IState {
    return this.state;
  }

  public setState(newState: any): void {
    this.state = newState;
    console.log('New state is now: ', newState);
  }

  public setStateWithStarwasEntity(obj: IStarwarsEntity): void {
    const newState = {
      ...this.state,
      [this.state.gameStep?.associatedStarwarsEntity]: obj,
    };
    this.setState(newState);
  }
}
