import { exit } from 'node:process';

import fastify from 'fastify';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

import { SetNBAPlayerOfTheDay } from './use-cases/SetNBAPlayerOfTheDay';
import { NBAPlayerRepository } from './repositories/NBAPlayerRepository';
import { NBAPlayerOfTheDayRepository } from './repositories/NBAPlayerOfTheDayRepository';

const server = fastify();
export const prisma = new PrismaClient();

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  console.log(`Server listening at ${address}`);
  await initApp();
});

async function initApp() {
  prisma.$connect();
  const nbaPlayerRepository = new NBAPlayerRepository();
  const nbaPlayerOfTheDayRepository = new NBAPlayerOfTheDayRepository();
  if (nbaPlayerOfTheDayRepository.get() === null) {
    const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(nbaPlayerRepository, nbaPlayerOfTheDayRepository);
    await setNBAPlayerOfTheDay.execute();
  }
}

cron.schedule('0 0 * * *', async () => {
  const setNBAPlayerOfTheDay = new SetNBAPlayerOfTheDay(new NBAPlayerRepository(), new NBAPlayerOfTheDayRepository());
  await setNBAPlayerOfTheDay.execute();
});
