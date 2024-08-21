import type { NBAPlayerRepository } from '../domain/repositories/NBAPlayerRepository';
import type { NBAPlayerDTO } from '../domain/dtos/NBAPlayerDTO';

export class SearchNBAPlayerUseCase {
  #repository: NBAPlayerRepository;

  constructor(repository: NBAPlayerRepository) {
    this.#repository = repository;
  }

  async execute(name: string): Promise<NBAPlayerDTO[]> {
    const trimmedName = name.trim().toLowerCase();
    const players: NBAPlayerDTO[] = await this.#repository.getAll();
    return this.#filterPlayersByName(players, trimmedName);
  }

  #filterPlayersByName(players: NBAPlayerDTO[], name: string): NBAPlayerDTO[] {
    const nameParts = name.split(' ');
    const hasTwoParts = nameParts.length === 2;

    return players.filter((player) => {
      const firstName = player.firstName.toLowerCase();
      const lastName = player.lastName.toLowerCase();

      if (hasTwoParts) {
        const [part1, part2] = nameParts;
        return (firstName === part1 && lastName === part2) || (firstName === part2 && lastName === part1);
      } else {
        return firstName === name || lastName === name;
      }
    });
  }
}
