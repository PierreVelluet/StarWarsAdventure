import { TransitionType, StepType } from "../enums";
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
  currentStepType: StepType;
  currentTransitiontype?: TransitionType;
  entitiesPreviouslyFetched?: IStarwarsEntity[] | null | undefined;
  numberOfReroll?: number;
}

export interface IState {
  loading: boolean;
  currentGameStep: IGameStep;
  localStorageStoreKey: string;
  mainCharacter: IMainCharacter;
  storyState: IStoryState;
}

export interface LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}

export interface ICharacteristic {
  name: string;
  value: number;
  image: string;
  description: string;
}

export interface IMainCharacter {
  character: ICharacter | null;
  vehicle: IVehicle | null;
  droid: IDroid | null;
  location: ILocation | null;
  characteristics: ICharacteristic[];
}

export interface IItem {
  id: number;
  name: String;
}

export interface IStoryChoice {
  id?: number;
  text: String;
  path: number;
  associatedItem: IItem | any;
}

export interface IStory {
  id: number;
  title: String;
  imagePath: String;
  text: String;
  choices?: IStoryChoice[] | any;
  type: String;
}

export interface IStoryState {
  visitedStoryIds: number[] | null;
  currentStoryId: number;
}