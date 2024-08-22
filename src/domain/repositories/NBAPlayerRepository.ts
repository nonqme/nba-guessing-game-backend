import type { BasicNBAPlayerDTO } from '../dtos/BasicNBAPlayerDTO';

export interface NBAPlayerRepository {
  getAll(): Promise<BasicNBAPlayerDTO[]>;
  searchByName(name: string): Promise<BasicNBAPlayerDTO[]>;
}
