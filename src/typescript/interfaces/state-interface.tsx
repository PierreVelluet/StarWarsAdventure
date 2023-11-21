import { ICharacter, IDroid, IVehicle } from "./starwars-interfaces";

export interface IGameStep {
  id: number;
  name: string;
  associatedStarwarsEntity: string;
  completed: boolean;
}

export interface IState {
  loading: boolean;
  character: ICharacter | null;
  droid: IDroid | null;
  vehicle: IVehicle | null;
  location: ICharacter | null;
  gameStep: IGameStep;
}
