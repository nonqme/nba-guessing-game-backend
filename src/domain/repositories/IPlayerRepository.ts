import { Player } from '../entities/Player';

export interface IPlayerRepository {
  getRandomPlayer(): Promise<Player>;
  getPlayerById(id: number): Promise<Player | null>;
}
