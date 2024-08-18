import cron from 'node-cron';
import fastify, { FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

import { SetNBAPlayerOfTheDay } from './use-cases/SetNBAPlayerOfTheDay';
import { NBAPlayerRepository } from './repositories/NBAPlayerRepository';
import { NBAPlayerOfTheDayRepository } from './repositories/NBAPlayerOfTheDayRepository';

import { DBClient } from './commons/DBClient';
import { Fetcher } from './commons/Fetcher';
import { GuessPlayerOfTheDay } from './use-cases/GuessPlayerOfTheDay';
import { GuessingResult } from './types';

export const server = fastify();
const prisma = new PrismaClient();
const dbClient = new DBClient(prisma);
const fetcher = new Fetcher();
const nbaPlayerRepository = new NBAPlayerRepository(fetcher);
const nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository(dbClient);

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    throw new Error('Failed to start server');
  }
  console.log(`Server listening at ${address}`);
  await initApp();
});

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

async function initApp() {
  await prisma.$connect();
  //const player = await nbaPlayerOfTheDayRepository.get();
  //if (!player) {
  await setPlayerOfTheDay();
  /*} else {
    logPlayerOfTheDay(player.name);
  }*/
}

async function setPlayerOfTheDay() {
  const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(nbaPlayerRepository, nbaPlayerOfTheDayRepository);
  const playerOfTheDay = await setNBAPlayerOfTheDay.execute();
  console.log('Player of the day set');
  logPlayerOfTheDay(playerOfTheDay.name);
}

function logPlayerOfTheDay(playerName: string) {
  console.log(`Player of the day is ${playerName}`);
}

cron.schedule('0 0 * * *', async () => {
  await setPlayerOfTheDay();
});
