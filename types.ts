
export enum GameState {
  TITLE = 'TITLE',
  GAME = 'GAME',
  MONOLOGUE = 'MONOLOGUE',
  ENDING = 'ENDING'
}

export type CharacterType = 'advisor' | 'military' | 'royal' | 'citizen' | 'elite' | 'mystic' | 'destiny';

export interface Stats {
  family: number;
  people: number;
  nobility: number;
}

export interface Choice {
  text: string;
  impact: Partial<Stats>;
}

export interface GameCard {
  id: number;
  speaker: string;
  characterType: CharacterType;
  prompt: string;
  description?: string; // Paragraphe d'explication
  left: Choice;
  right: Choice;
}

export interface Monologue {
  id: string;
  text: string[];
}

export interface Ending {
  title: string;
  context: string;
  description: string[];
  finalQuote: string;
  characterType: CharacterType;
}
