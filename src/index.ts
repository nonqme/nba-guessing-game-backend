import { exit } from 'node:process';

import fastify from 'fastify';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

import { SetNBAPlayerOfTheDay } from './use-cases/SetNBAPlayerOfTheDay';
import { NBAPlayerRepository } from './repositories/NBAPlayerRepository';
import { NBAPlayerOfTheDayRepository } from './repositories/NBAPlayerOfTheDayRepository';

import { DBClient } from './commons/DBClient';
import { Fetcher } from './commons/Fetcher';

import { guess } from './routes/guess';

const server = fastify();
export const prisma = new PrismaClient();
export const dbClient = new DBClient(prisma);
export const fetcher = new Fetcher();

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  console.log(`Server listening at ${address}`);
  await initApp();
});

import { FastifyRequest } from 'fastify';

server.post('/guess', async (request: FastifyRequest<{ Body: { guess: string } }>, reply) => {
  const answer = request.body.guess;
  const result = await guess(answer);
  reply.send(result);
});

async function initApp() {
  prisma.$connect();
  const nbaPlayerRepository = new NBAPlayerRepository(fetcher);
  const nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository(dbClient);
  const playerExists = await nbaPlayerOfTheDayRepository.get();
  if (playerExists === null) {
    const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(nbaPlayerRepository, nbaPlayerOfTheDayRepository);
    const playerOfTheDay = await setNBAPlayerOfTheDay.execute();
    console.log('Player of the day set');
    console.log(`It is ${playerOfTheDay.name}`);
  }
}

cron.schedule('0 0 * * *', async () => {
  const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(
    new NBAPlayerRepository(fetcher),
    new NBAPlayerOfTheDayRepository(dbClient)
  );
  const playerOfTheDay = await setNBAPlayerOfTheDay.execute();
  console.log('Player of the day set');
  console.log(`It is ${playerOfTheDay.name}`);
});
