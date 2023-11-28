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
    currentGameStep: steps[1],
    localStorageStoreKey: 'starwarsAdventureKey',
  });
  sharedState$: Observable<IState> = this.state.asObservable();

  constructor(private _cacheService: CacheService) {
    this.gameSteps = steps;
  }

  // Get the state
  public getState(): IState {
    return this.state.getValue();
  }

  // Set the state && stock in in localStorage
  public setState(newState: IState) {
    this.state.next(newState);

    // Save the data in the browser cache
    this._cacheService.save({
      key: newState.localStorageStoreKey,
      data: newState,
    });
    console.log('state updated', newState);
  }

  // Update entities fetched in state
  public updateEntitiesPreviouslyFetched(
    entities: IStarwarsEntity[],
    reroll: boolean
  ) {
    const newState: IState = this.getState();
    newState.currentGameStep = {
      ...newState.currentGameStep,
      entitiesPreviouslyFetched: entities,
      numberOfReroll: reroll ? 0 : newState.currentGameStep.numberOfReroll,
    };
    this.setState(newState);
  }

  // Diminish the reroll counter
  public updateRerollCounter() {
    const newState: IState = {
      ...this.getState(),
      currentGameStep: {
        ...this.getState().currentGameStep,
        numberOfReroll: 1,
      },
    };

    this.setState(newState);
  }

  // Return a copy of the provided state with the new current step provided
  public generateNewStateWithNewCurrentGameStep(
    oldState: IState,
    steppingDirection: SteppingDirection
  ): IState {
    let newState: IState = {
      ...oldState,
    };

    newState.currentGameStep =
      this.gameSteps[this.state.value.currentGameStep.id + steppingDirection];

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
    }
  }

  // Retrieve the state in the local storage;
  public retrieveLocalStorageState(): IState | null {
    let localStorageStore: IState | null = null;
    let localStrorageString: string | null = localStorage.getItem(
      this.getState().localStorageStoreKey
    );

    if (localStrorageString) {
      const localStorageObj: any = JSON.parse(localStrorageString);
      const keysArray = Object.keys(localStorageObj);
      keysArray?.forEach((keyName: string) => {
        if (keyName == 'value') {
          localStorageStore = JSON.parse(localStorageObj[keyName]);
        }
      });
    }

    return localStorageStore;
  }

  // Check if there is entities previously fetched in the state, and if they match with the current step.
  isEntitiesAlreadyFetched(): boolean {
    const entitiesPreviouslyFetched: IStarwarsEntity[] | null | undefined =
      this.getState().currentGameStep.entitiesPreviouslyFetched;
    if (
      entitiesPreviouslyFetched &&
      entitiesPreviouslyFetched.some(
        (entity: IStarwarsEntity) =>
          entity.type ==
          this.getState().currentGameStep.associatedStarwarsEntity
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Set the state with the cached one, if it exists
  updateStateWithCachedOne(): void {
    const cachedState: IState | null = this.retrieveLocalStorageState();

    if (cachedState !== null && cachedState !== this.getState()) {
      this.setState(cachedState);
    }
  }
}
