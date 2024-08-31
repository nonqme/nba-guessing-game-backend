import { Player } from '../entities/Player';

export interface IPlayerRepository {
  getRandomPlayer(): Promise<Player>;
}
