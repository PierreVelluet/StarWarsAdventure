import { Injectable } from '@angular/core';
import { State } from 'src/typescript/interfaces/state-interface';
import gameSteps from '../../gameSteps.json';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private state: State;
  constructor() {
    this.state = {
      loading: false,
      character: null,
      gameStep: gameSteps[0],
    };
  }
  public getState(): any {
    return this.state;
  }

  public setState(newState: any): void {
    this.state = newState;
    console.log('New state is now: ', newState);
  }
}
