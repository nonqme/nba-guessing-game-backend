import { describe, it } from 'node:test';
import assert from 'node:assert';

import { SetNBAPlayerOfTheDay } from '../src/use-cases/SetNBAPlayerOfTheDay';
import type { INBAPlayerOfTheDayRepository, INBAPlayerRepository } from '../src/interfaces';
import type { NBAPlayer } from '../src/types';

import { nbaPlayers } from './MockNBAPlayers';

describe('We want to change the nba player of the day', () => {
  let playerOfTheDay: NBAPlayer;
  it('should set the NBA player of the day', async () => {
    const nbaPlayerRepository: INBAPlayerRepository = {
      getAll: async () => {
        return nbaPlayers;
      },
    } as INBAPlayerRepository;
    const nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository = {
      get: async () => null,
      save: async (player: NBAPlayer) => {
        playerOfTheDay = player;
      },
      delete: async () => {},
    };
    const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(nbaPlayerRepository, nbaPlayerOfTheDayRepository);

    const player = await setNBAPlayerOfTheDay.execute();

    // Verify that the player of the day is set correctly
    assert.deepStrictEqual(playerOfTheDay, player);

    // Verify that the player returned is from the array of players
    assert.ok(nbaPlayers.includes(player));
  });
});
