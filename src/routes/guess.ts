import type { FastifyRequest } from 'fastify';

import type { GuessingResult } from '../types';
import { server } from '../index';

import { GuessPlayerOfTheDay } from '../use-cases/GuessPlayerOfTheDay';
import { nbaPlayerOfTheDayRepository, nbaPlayerRepository } from '../index';

server.post('/guess', async (request: FastifyRequest<{ Body: { guess: string } }>, reply) => {
  try {
    if (!request.body.guess) throw new Error('Missing guess parameter');
    const { guess } = request.body;
    const guessPlayerOfTheDay = new GuessPlayerOfTheDay(nbaPlayerOfTheDayRepository, nbaPlayerRepository);
    const result: GuessingResult = await guessPlayerOfTheDay.execute(guess);
    reply.send(result);
  } catch (error) {
    const typedError = error as Error;
    reply.code(500).send({ message: typedError.message });
  }
});
