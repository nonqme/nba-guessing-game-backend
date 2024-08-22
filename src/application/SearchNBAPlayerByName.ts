import type { NBAPlayerRepository } from '../domain/repositories/NBAPlayerRepository';
import type { BasicNBAPlayerDTO } from '../domain/dtos/BasicNBAPlayerDTO';

export class SearchNBAPlayerByName {
  #repository: NBAPlayerRepository;

  constructor(repository: NBAPlayerRepository) {
    this.#repository = repository;
  }

  async execute(name: string): Promise<BasicNBAPlayerDTO[]> {
    return this.#repository.searchByName(name);
  }
}
