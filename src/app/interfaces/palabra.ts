export type GameID = {
  game_id: number;
};

export type LetterStatus = {
  letter: string;
  status: string;
  position: number;
};

export type Palabra = {
 [pos: string]: string;
};

export interface Rounds {
  wordRound: string[],
  wordStatusRound: string[],
  positionInput: number
}
