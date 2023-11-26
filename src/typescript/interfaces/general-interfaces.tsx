import { StepType } from "../enums";
import { ICharacter, IDroid, IVehicle, ILocation } from "./starwars-interfaces";

export interface IGameStep {
  id: number;
  name: string;
  associatedStarwarsEntity: string;
  stepperLabel?: string;
  completed: boolean;
  type: StepType;
}

export interface IState {
  loading: boolean;
  character: ICharacter | null;
  droid: IDroid | null;
  vehicle: IVehicle | null;
  location: ILocation | null;
  currentGameStep: IGameStep;
}

export interface LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
