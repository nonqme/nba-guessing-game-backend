import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import type { Player } from '../domain/entities/Player';
import type { GuessDailyPlayer } from '../use-cases/GuessDailyPlayer';

export async function guessRoute(app: FastifyInstance, opts: FastifyPluginOptions, guessDailyPlayer: GuessDailyPlayer) {
  app.post('/guess', async (request, reply) => {
    try {
      const { id } = request.body as { id: Player['id'] };
      const answer = await guessDailyPlayer.execute(id);
      reply.code(200).send(answer);
    } catch {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });
}

export class GuessRoute {
  #guessDailyPlayer: GuessDailyPlayer;
  constructor(guessDailyPlayer: GuessDailyPlayer) {
    this.#guessDailyPlayer = guessDailyPlayer;
  }
  async register(app: FastifyInstance) {
    app.post('/guess', async (request, reply) => {
      try {
        const { id } = request.body as { id: Player['id'] };
        console.log('id', id);
        const answer = await this.#guessDailyPlayer.execute(id);
        console.log('answer', answer);
        reply.code(200).send(answer);
      } catch (error) {
        console.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    });
  }
}
