import { INBAPlayerRepository, INBAPlayerService } from '../interfaces';
import type { NBAPlayer } from '../types';

export class GetRandomNBAPlayer {
  #nbaPlayerService: INBAPlayerService;
  #nbaPlayerRepository: INBAPlayerRepository;
  constructor(
    nbaPlayerService: INBAPlayerService,
    nbaPlayerRepository: INBAPlayerRepository
  ) {
    this.#nbaPlayerService = nbaPlayerService;
    this.#nbaPlayerRepository = nbaPlayerRepository;
  }

  async execute(): Promise<NBAPlayer> {
    const randomPlayer = await this.#nbaPlayerService.getRandomNBAPlayer();
    await this.#nbaPlayerRepository.deleteNBAPlayerOfTheDay();
    await this.#nbaPlayerRepository.saveNBAPlayerOfTheDay(randomPlayer);
    return randomPlayer;
  }
}
