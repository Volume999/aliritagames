import { User } from "@/types/user";

export type GameStatus = "PENDING" | "SETUP" | "ACTIVE" | "COMPLETED";

export interface Game {
  id: string;
  initiator: User;
  invitee: User;
  status: GameStatus;
  createdAt: Date;
}

export type GuessGamePlayerMetadata = {
  secretWord: string;
  guesses: { word: string };
};

export type GuessGame = Game & {
  initiatorMetadata?: GuessGamePlayerMetadata;
  inviteeMetadata?: GuessGamePlayerMetadata;
  turn?: number;
};
