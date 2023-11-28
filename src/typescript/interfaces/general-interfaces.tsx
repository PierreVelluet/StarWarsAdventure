import { StepType } from "../enums";
import {
  ICharacter,
  IDroid,
  IVehicle,
  ILocation,
  IStarwarsEntity,
} from "./starwars-interfaces";

export interface IGameStep {
  id: number;
  name: string;
  associatedStarwarsEntity: string;
  stepperLabel?: string;
  completed: boolean;
  type: StepType;
  entitiesPreviouslyFetched?: IStarwarsEntity[] | null | undefined;
  numberOfReroll?: number;
}

export interface IState {
  loading: boolean;
  character: ICharacter | null;
  droid: IDroid | null;
  vehicle: IVehicle | null;
  location: ILocation | null;
  currentGameStep: IGameStep;
  localStorageStoreKey: string;
}

export interface LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
