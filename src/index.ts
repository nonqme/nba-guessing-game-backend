import 'dotenv/config';

import type { IServer } from './core/commons/http';
import type { IScheduler } from './core/commons/scheduler';

import { FastifyServer } from './infrastructure/http/server';
import { CronScheduler } from './infrastructure/scheduler';

const init = async () => {
  if (!process.env.HOST || !process.env.PORT) throw new Error('Missing environment variables');
  const { HOST, PORT } = process.env;
  const routes: [] = [];
  const scheduler: IScheduler = new CronScheduler();
  const server: IServer = new FastifyServer(HOST, Number(PORT), routes, scheduler);
  await server.start();
};

init();
