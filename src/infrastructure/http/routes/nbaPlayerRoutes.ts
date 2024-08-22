import type { FastifyInstance } from 'fastify';
import type { BasicNBAPlayerDTO } from '../../../domain/dtos/BasicNBAPlayerDTO';
import type { NBAPlayerController } from '../controllers/NBAPlayerController';

export class NBAPlayerRoutes {
  #controller: NBAPlayerController;
  constructor(controller: NBAPlayerController) {
    this.#controller = controller;
  }
  async handler(server: FastifyInstance) {
    server.get<{
      Querystring: { name: string };
      Reply: { 200: { players: BasicNBAPlayerDTO[] } };
    }>('/player', async (request, reply) => {
      await this.#controller.searchNBAPlayerByName(request, reply);
    });
  }
}
