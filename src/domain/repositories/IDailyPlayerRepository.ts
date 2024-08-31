import { Player } from '../entities/Player';

export interface IDailyPlayerRepository {
  get(): Promise<Player | null>;
  set(player: Player): Promise<void>;
  delete(): Promise<void>;
}
