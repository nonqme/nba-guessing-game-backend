import type { INBAPlayerOfTheDayRepository, IDBClient } from '../interfaces';
import type { NBAPlayer } from '../types';

export class NBAPlayerOfTheDayRepository implements INBAPlayerOfTheDayRepository {
  #dbClient: IDBClient;
  constructor(dbClient: IDBClient) {
    this.#dbClient = dbClient;
  }

  async get(): Promise<NBAPlayer | null> {
    const player = await this.#dbClient.findFirst<NBAPlayer>('nBAPlayerOfTheDay');
    if (!player) return null;
    return {
      id: player.id,
      name: player.name,
      height: player.height,
      country: player.country,
      college: player.college,
      team: player.team,
      position: player.position,
    };
  }

  async save(player: NBAPlayer): Promise<void> {
    await this.#dbClient.create<NBAPlayer>('nBAPlayerOfTheDay', player);
  }

  async delete(): Promise<void> {
    await this.#dbClient.deleteMany('nBAPlayerOfTheDay');
  }
}
