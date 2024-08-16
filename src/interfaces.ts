import type { NBAPlayer } from './types';

export interface INBAPlayerRepository {
  getAll(): Promise<NBAPlayer[]>;
}

export interface INBAPlayerOfTheDayRepository {
  get(): Promise<NBAPlayer | null>;
  save(player: NBAPlayer): Promise<void>;
  delete(): Promise<void>;
}
