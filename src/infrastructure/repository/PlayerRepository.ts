import type { IPlayerRepository } from '../../domain/repositories/IPlayerRepository';
import { Player } from '../../domain/entities/Player';

export class MockPlayerRepository implements IPlayerRepository {
  async getRandomPlayer(): Promise<Player> {
    return new Player({
      id: 1,
      firstName: 'Michael',
      lastName: 'Jordan',
      country: 'USA',
      birthDate: 1963,
      height: '6-6',
      team: 'Chicago Bulls',
      positions: ['guard'],
    });
  }

  async getPlayerById(id: Player['id']): Promise<Player | null> {
    if (id === 1) {
      return new Player({
        id: 1,
        firstName: 'Michael',
        lastName: 'Jordan',
        country: 'USA',
        birthDate: 1963,
        height: '6-6',
        team: 'Chicago Bulls',
        positions: ['guard'],
      });
    }
    return null;
  }
}
