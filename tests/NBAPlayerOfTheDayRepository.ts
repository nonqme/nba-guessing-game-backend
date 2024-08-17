import { describe, it, before } from 'node:test';
import assert from 'node:assert';

import { INBAPlayerOfTheDayRepository, IDBClient } from '../src/interfaces';
import { NBAPlayerOfTheDayRepository } from '../src/repositories/NBAPlayerOfTheDayRepository';

import { nbaPlayers } from './MockNBAPlayers';
import type { NBAPlayer } from '../src/types';

describe('NBAPlayerOfTheDayRepository', () => {
  let nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository;
  let nbaPlayerOfTheDay: NBAPlayer | null;
  before(() => {
    const fakeDBClient: IDBClient = {
      findFirst: async <NBAPlayer>() => nbaPlayerOfTheDay as NBAPlayer,
      create: async () => {
        nbaPlayerOfTheDay = nbaPlayers[0];
      },
      deleteMany: async () => {
        nbaPlayerOfTheDay = null;
      },
    };
    nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository(fakeDBClient);
  });

  it('should return null if there is no NBA player of the day', async () => {
    nbaPlayerOfTheDay = null;
    const player = await nbaPlayerOfTheDayRepository.get();
    assert.strictEqual(player, null);
  });

  it('should return the NBA player of the day', async () => {
    nbaPlayerOfTheDay = nbaPlayers[0];
    const player = await nbaPlayerOfTheDayRepository.get();
    assert.deepStrictEqual(player, nbaPlayers[0]);
  });

  it('should save the NBA player of the day', async () => {
    nbaPlayerOfTheDay = null;
    await nbaPlayerOfTheDayRepository.save(nbaPlayers[0]);
    const player = await nbaPlayerOfTheDayRepository.get();
    assert.deepStrictEqual(player, nbaPlayers[0]);
  });

  it('should delete the NBA player of the day', async () => {
    nbaPlayerOfTheDay = nbaPlayers[0];
    await nbaPlayerOfTheDayRepository.delete();
    const player = await nbaPlayerOfTheDayRepository.get();
    assert.strictEqual(player, null);
  });
});
