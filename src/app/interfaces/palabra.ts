export type GameID = {
  game_id: string;
};

export type LetterStatus = {
  letter: string;
  status: string;
  position: number;
};

export type Palabra = {
  pos0: string;
  pos1: string;
  pos2: string;
  pos3: string;
  pos4: string;
};

export type DataDialog = {
  title: string;
  text: string;
  correctWord: string;
  button: string;
}
