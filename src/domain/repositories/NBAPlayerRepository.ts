import { NBAPlayerDTO } from '../dtos/NBAPlayerDTO';

export interface NBAPlayerRepository {
  getAll(): Promise<NBAPlayerDTO[]>;
}
