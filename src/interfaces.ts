import type { NBAPlayer } from './types';

export interface INBAPlayerRepository {
  getAll(): Promise<NBAPlayer[]>;
}

export interface INBAPlayerOfTheDayRepository {
  get(): Promise<NBAPlayer | null>;
  save(player: NBAPlayer): Promise<void>;
  delete(): Promise<void>;
}

export interface IDBClient {
  findFirst<T>(table: string): Promise<T | null>;
  create<T>(table: string, data: T): Promise<void>;
  deleteMany(table: string): Promise<void>;
}
