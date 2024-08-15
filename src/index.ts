import { exit } from 'node:process';

import fastify from 'fastify';
import 'dotenv/config';

import type { NBAPlayer } from './types';
import type { INBAPlayerRepository, INBAPlayerService } from './interfaces';
import { GetRandomNBAPlayer } from './use-cases/GetRandomNBAPlayer';
import { NBAPlayerService } from './services/NBAPlayerService';
import { FakeNBAPlayerRepository } from './repositories/FakeNBAPlayerRepository';

const server = fastify();

server.listen({ port: 8080 }, async (err, address) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  console.log(`Server listening at ${address}`);

  const nbaPlayerService: INBAPlayerService = new NBAPlayerService();
  const fakeNBAPlayerRepository: INBAPlayerRepository =
    new FakeNBAPlayerRepository();

  const getRandomNBAPlayer = new GetRandomNBAPlayer(
    nbaPlayerService,
    fakeNBAPlayerRepository
  );

  const randomPlayer: NBAPlayer = await getRandomNBAPlayer.execute();
  console.log('Player of the day is:', randomPlayer.name);

  server.close();
});
