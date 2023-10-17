import { Character } from "./starwars-interfaces";

export interface GameStep {
  id: number;
  name: string;
  associatedStarwarsEntity: string;
  choosingPanelTitle: string;
}

export interface State {
  loading: boolean;
  character: Character | null;
  gameStep: GameStep | null;
}
