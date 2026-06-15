export interface GameDetail {
  id: string;
  number: string;
  title: string;
  description: string;
  rules: string;
  icon: string;
}

export type GameStatus = "idle" | "playing" | "won" | "lost";
