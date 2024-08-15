import type { INBAPlayerRepository } from '../interfaces';
import type { NBAPlayer } from '../types';

export class FakeNBAPlayerRepository implements INBAPlayerRepository {
  playerOfTheDay: NBAPlayer | null = null;

  async deleteNBAPlayerOfTheDay(): Promise<void> {
    if (this.playerOfTheDay) {
      console.log('Deleting player...');
      this.playerOfTheDay = null;
    }
  }

  async saveNBAPlayerOfTheDay(player: NBAPlayer): Promise<void> {
    console.log('Saving player...');
    this.playerOfTheDay = player;
  }
}
