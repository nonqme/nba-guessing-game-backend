import { describe, it, mock } from 'node:test';
import assert from 'node:assert';

import { SearchNBAPlayerUseCase } from '../../src/application/SearchNBAPlayerUseCase';
import type { NBAPlayerRepository } from '../../src/domain/repositories/NBAPlayerRepository';
import type { NBAPlayerDTO } from '../../src/domain/dtos/NBAPlayerDTO';

const players: NBAPlayerDTO[] = [
  { firstName: 'Stephen', lastName: 'Curry' },
  { firstName: 'Kevin', lastName: 'Durant' },
  { firstName: 'Kevin', lastName: 'Love' },
  { firstName: 'Kevin', lastName: 'Garnett' },
  { firstName: 'Kobe', lastName: 'Bryant' },
  { firstName: 'Dell', lastName: 'Curry' },
  { firstName: 'Seth', lastName: 'Curry' },
] as NBAPlayerDTO[];

describe('SearchNBAPlayerUseCase', () => {
  const repository = {
    getAll: async () => players,
  } as NBAPlayerRepository;
  const useCase = new SearchNBAPlayerUseCase(repository);
  mock.method<NBAPlayerRepository, 'getAll'>(repository, 'getAll');

  it('should have called repository.getAll', async () => {
    const firstName = 'Kobe';
    await useCase.execute(firstName);
    assert.strictEqual(repository.getAll.call.length, 1);
  });

  it('should return players with the given first name', async () => {
    const firstName = 'Kevin';
    const result = await useCase.execute(firstName);

    assert.strictEqual(result.length, 3);
    for (const player of result) {
      assert(player.firstName === firstName);
    }
  });

  it('should return players with the given last name', async () => {
    const lastName = 'Curry';
    const result = await useCase.execute(lastName);

    assert.strictEqual(result.length, 3);
    for (const player of result) {
      assert(player.lastName === lastName);
    }
  });

  it('should return players with the given first and last name', async () => {
    const fullName = 'Kobe Bryant';
    const result = await useCase.execute(fullName);

    assert.strictEqual(result.length, 1);
    assert(result[0].firstName === 'Kobe');
    assert(result[0].lastName === 'Bryant');
  });

  it('should return players with the given last and first name', async () => {
    const fullName = 'Bryant Kobe';
    const result = await useCase.execute(fullName);

    assert.strictEqual(result.length, 1);
    assert(result[0].firstName === 'Kobe');
    assert(result[0].lastName === 'Bryant');
  });

  it('should return an empty array if no player found', async () => {
    const name = 'Michael Jordan';
    const result = await useCase.execute(name);

    assert.strictEqual(result.length, 0);
  });
});
