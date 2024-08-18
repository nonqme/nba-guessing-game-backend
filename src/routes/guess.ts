import type { GuessingResult } from '../types';

import { GuessPlayerOfTheDay } from '../use-cases/GuessPlayerOfTheDay';
import { NBAPlayerOfTheDayRepository } from '../repositories/NBAPlayerOfTheDayRepository';
import { NBAPlayerRepository } from '../repositories/NBAPlayerRepository';
import { fetcher, dbClient } from '../index';

export async function guess(guess: string): Promise<GuessingResult> {
  const nbaPlayerRepository = new NBAPlayerRepository(fetcher);
  const nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository(dbClient);
  const guessPlayerOfTheDay = new GuessPlayerOfTheDay(nbaPlayerOfTheDayRepository, nbaPlayerRepository);

  return guessPlayerOfTheDay.execute(guess);
}
