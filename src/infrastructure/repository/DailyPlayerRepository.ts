import { IDailyPlayerRepository } from '../../domain/repositories/IDailyPlayerRepository';
import { Player } from '../../domain/entities/Player';

export class MockDailyPlayerRepository implements IDailyPlayerRepository {
  #player: Player | null = null;

  async get(): Promise<Player | null> {
    return this.#player;
  }

  async set(player: Player): Promise<void> {
    this.#player = player;
  }

  async delete(): Promise<void> {
    this.#player = null;
  }
}
