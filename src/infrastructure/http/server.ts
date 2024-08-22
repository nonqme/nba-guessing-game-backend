import Fastify, { type FastifyPluginAsync } from 'fastify';

export const buildFastifyServer = async (routes: FastifyPluginAsync[]) => {
  const server = Fastify({ logger: true });
  try {
    for (const route of routes) {
      await server.register(route);
    }
    await server.ready();
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
};
