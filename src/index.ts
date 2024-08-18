import cron from 'node-cron';
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

import { SetNBAPlayerOfTheDay } from './use-cases/SetNBAPlayerOfTheDay';
import { NBAPlayerRepository } from './repositories/NBAPlayerRepository';
import { NBAPlayerOfTheDayRepository } from './repositories/NBAPlayerOfTheDayRepository';

import { DBClient } from './commons/DBClient';
import { Fetcher } from './commons/Fetcher';

export const server = fastify();
const prisma = new PrismaClient();
const dbClient = new DBClient(prisma);
const fetcher = new Fetcher();
export const nbaPlayerRepository = new NBAPlayerRepository(fetcher);
export const nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository(dbClient);

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    throw new Error('Failed to start server');
  }
  console.log(`Server listening at ${address}`);
  await initApp();
});

async function initApp() {
  await prisma.$connect();
  const playerExists = await nbaPlayerOfTheDayRepository.get();
  if (!playerExists) {
    await setPlayerOfTheDay();
  }
}

async function setPlayerOfTheDay() {
  const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(nbaPlayerRepository, nbaPlayerOfTheDayRepository);
  const playerOfTheDay = await setNBAPlayerOfTheDay.execute();
  console.log('Player of the day set');
  console.log(`It is ${playerOfTheDay.name}`);
}

cron.schedule('0 0 * * *', async () => {
  await setPlayerOfTheDay();
});
