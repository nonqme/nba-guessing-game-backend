import type { NBAPlayer } from './types';

export interface INBAPlayerRepository {
  saveNBAPlayerOfTheDay(player: NBAPlayer): Promise<void>;
  deleteNBAPlayerOfTheDay(): Promise<void>;
}

export interface INBAPlayerService {
  getRandomNBAPlayer(): Promise<NBAPlayer>;
}
