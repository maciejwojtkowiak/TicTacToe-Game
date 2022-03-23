export enum ActivePlayer {
  X,
  O,
}

export interface ChosenNumbers {
  O: string[];
  X: string[];
  total: string[];
}

export interface PlayerAction {
  tile: HTMLDivElement;

  chosenNumbersByPlayer: string[];
}
