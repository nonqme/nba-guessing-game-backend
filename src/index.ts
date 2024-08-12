import { exit } from 'node:process';

import fastify from 'fastify';

const server = fastify();

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    exit(1);
  }
  console.log(`Server listening at ${address}`);
});
