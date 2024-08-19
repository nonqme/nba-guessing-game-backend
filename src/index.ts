import 'dotenv/config';

import type { IServer } from './core/commons/http';
import { FastifyServer } from './infrastructure/http/server';

const init = async () => {
  if (!process.env.HOST || !process.env.PORT) throw new Error('Missing environment variables');
  const { HOST, PORT } = process.env;
  const server: IServer = new FastifyServer(HOST, Number(PORT));
  await server.start();
};

init();
