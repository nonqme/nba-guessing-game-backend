import type { NBAPlayer } from './types';

export interface INBAPlayerRepository {
  getAll(): Promise<NBAPlayer[]>;
  getByName(name: string): Promise<NBAPlayer | null>;
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

export interface IFetcher {
  fetch(url: URL, options: RequestInit): Promise<Response>;
}
