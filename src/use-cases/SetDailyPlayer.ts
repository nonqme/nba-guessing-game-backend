import type { Player } from '../domain/entities/Player';
import type { IPlayerRepository } from '../domain/repositories/IPlayerRepository';
import type { IDailyPlayerRepository } from '../domain/repositories/IDailyPlayerRepository';

export class SetDailyPlayer {
  #playerRepository: IPlayerRepository;
  #dailyPlayerRepository: IDailyPlayerRepository;
  constructor(playerRepository: IPlayerRepository, dailyPlayerRepository: IDailyPlayerRepository) {
    this.#playerRepository = playerRepository;
    this.#dailyPlayerRepository = dailyPlayerRepository;
  }
  async execute(): Promise<void> {
    const player: Player = await this.#playerRepository.getRandomPlayer();
    const dailyPlayer = await this.#dailyPlayerRepository.get();
    if (dailyPlayer) {
      await this.#dailyPlayerRepository.delete();
      await this.#dailyPlayerRepository.set(player);
    } else {
      await this.#dailyPlayerRepository.set(player);
    }
  }
}
