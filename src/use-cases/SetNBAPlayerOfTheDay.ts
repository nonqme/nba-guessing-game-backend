import { INBAPlayerRepository, INBAPlayerOfTheDayRepository } from '../interfaces';
import type { NBAPlayer } from '../types';

export class SetNBAPlayerOfTheDay {
  #nbaPlayerRepository: INBAPlayerRepository;
  #nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository;
  constructor(nbaPlayerRepository: INBAPlayerRepository, nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository) {
    this.#nbaPlayerRepository = nbaPlayerRepository;
    this.#nbaPlayerOfTheDayRepository = nbaPlayerOfTheDayRepository;
  }

  async execute(): Promise<NBAPlayer> {
    const players: NBAPlayer[] = await this.#nbaPlayerRepository.getAll();
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    await this.#nbaPlayerOfTheDayRepository.delete();
    await this.#nbaPlayerOfTheDayRepository.save(randomPlayer);
    return randomPlayer;
  }
}
