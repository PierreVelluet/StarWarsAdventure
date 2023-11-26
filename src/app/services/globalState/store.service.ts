import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  IGameStep,
  IState,
} from 'src/typescript/interfaces/general-interfaces';
import steps from '../../gameSteps.json';
import { IStarwarsEntity } from 'src/typescript/interfaces/starwars-interfaces';
import { SteppingDirection } from 'src/typescript/enums';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private gameSteps: IGameStep[];
  private state: BehaviorSubject<IState> = new BehaviorSubject<IState>({
    loading: false,
    character: null,
    droid: null,
    vehicle: null,
    location: null,
    currentGameStep: steps[0],
  });
  sharedState$: Observable<IState> = this.state.asObservable();

  constructor(private _cacheService: CacheService) {
    this.gameSteps = steps;
  }

  // Get the state
  public getState(): IState {
    return this.state.getValue();
  }

  // Set the state
  public setState(newStore: IState) {
    this.state.next(newStore);
  }

  // Return a copy of the provided state with the new current step provided
  public generateNewStateWithNewCurrentGameStep(
    oldState: IState,
    steppingDirection: SteppingDirection
  ): IState {
    const newState: IState = {
      ...oldState,
      currentGameStep:
        this.gameSteps[this.state.value.currentGameStep.id + steppingDirection],
    };
    return newState;
  }

  // Return a copy of the provided state with the new entity provided
  public generateNewStateWithNewEntity(
    oldState: IState,
    entityName: string,
    entityValue: IStarwarsEntity
  ): IState {
    const newState: IState = {
      ...oldState,
      [entityName]: entityValue,
    };

    return newState;
  }

  // update the state with provided params
  public updateStateWithParams(
    entityName: string | null = null,
    entityValue: IStarwarsEntity | null = null,
    direction: SteppingDirection | null = null
  ): void {
    let newState: IState = this.getState();

    if (entityName && entityValue)
      newState = this.generateNewStateWithNewEntity(
        this.state.getValue(),
        entityName,
        entityValue
      );

    if (direction)
      newState = this.generateNewStateWithNewCurrentGameStep(
        newState,
        direction
      );

    if (this.getState() != newState) {
      // Save the data in the store
      this.setState(newState);
      // Save the data in the browser cache
      this._cacheService.save({
        key: 'starwarsAdventureKey',
        data: newState,
      });
      console.log('newState', newState);
    }
  }

  // Retrieve the state in the local storage, and update the current one with it, if different.
  public retrieveLocalStorageState(): void {
    let localStrorageString: string | null = localStorage.getItem(
      'starwarsAdventureKey'
    );

    if (localStrorageString) {
      const localStorageObj: any = JSON.parse(localStrorageString);
      const keysArray = Object.keys(localStorageObj);
      keysArray?.forEach((keyName: string) => {
        if (keyName == 'value') {
          const localStorageStore: IState = JSON.parse(
            localStorageObj[keyName]
          );
          if (localStorageStore) this.setState(localStorageStore);
          return;
        }
      });
    }
  }
}
