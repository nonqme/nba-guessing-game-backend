import fastify from 'fastify';

export function build(opts = {}) {
  const app = fastify(opts);

  return app;
}
