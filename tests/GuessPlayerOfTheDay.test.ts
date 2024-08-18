import { describe, it } from 'node:test';
import assert from 'node:assert';

import { GuessPlayerOfTheDay } from '../src/use-cases/GuessPlayerOfTheDay';
import type { INBAPlayerOfTheDayRepository, INBAPlayerRepository } from '../src/interfaces';
import type { NBAPlayer, GuessingResult } from '../src/types';

import { nbaPlayers } from './MockNBAPlayers';

describe('We want to guess the NBA player of the day', () => {
  it('should return correct guessing result', async () => {
    const playerOfTheDay: NBAPlayer = nbaPlayers[0];
    const nbaPlayerRepository: INBAPlayerRepository = {
      getByName: async (name: string) => {
        return nbaPlayers.find((player) => player.name === name);
      },
    } as INBAPlayerRepository;
    const nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository = {
      get: async () => playerOfTheDay,
    } as INBAPlayerOfTheDayRepository;
    const guessPlayerOfTheDay = new GuessPlayerOfTheDay(nbaPlayerOfTheDayRepository, nbaPlayerRepository);

    const result: GuessingResult = await guessPlayerOfTheDay.execute(playerOfTheDay.name);

    assert.deepStrictEqual(result.name.correct, 'correct');
    assert.deepStrictEqual(result.height.correct, 'correct');
    assert.deepStrictEqual(result.weight.correct, 'correct');
    assert.deepStrictEqual(result.country.correct, 'correct');
    assert.deepStrictEqual(result.college.correct, 'correct');
    assert.deepStrictEqual(result.team.correct, 'correct');
    assert.deepStrictEqual(result.position.correct, 'correct');
  });

  it('should return incorrect guessing result', async () => {
    const playerOfTheDay: NBAPlayer = nbaPlayers[0];
    const nbaPlayerRepository: INBAPlayerRepository = {
      getByName: async (name: string) => {
        return nbaPlayers.find((player) => player.name === name);
      },
    } as INBAPlayerRepository;
    const nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository = {
      get: async () => playerOfTheDay,
    } as INBAPlayerOfTheDayRepository;
    const guessPlayerOfTheDay = new GuessPlayerOfTheDay(nbaPlayerOfTheDayRepository, nbaPlayerRepository);

    const result: GuessingResult = await guessPlayerOfTheDay.execute(nbaPlayers[3].name);

    assert.deepStrictEqual(result.name.correct, 'incorrect');
    assert.deepStrictEqual(result.height.correct, 'incorrect');
    assert.deepStrictEqual(result.weight.correct, 'incorrect');
    assert.deepStrictEqual(result.country.correct, 'incorrect');
    assert.deepStrictEqual(result.college.correct, 'incorrect');
    assert.deepStrictEqual(result.team.correct, 'incorrect');
    assert.deepStrictEqual(result.position.correct, 'partial');
  });
});
