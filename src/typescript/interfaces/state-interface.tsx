import { ICharacter } from "./starwars-interfaces";

export interface IGameStep {
  id: number;
  name: string;
  associatedStarwarsEntity: string;
  choosingPanelTitle: string;
  completed: boolean;
}

export interface IState {
  loading: boolean;
  character: ICharacter | null;
  gameStep: IGameStep;
}
