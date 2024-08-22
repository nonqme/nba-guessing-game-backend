import type { FastifyReply, FastifyRequest } from 'fastify';
import type { SearchNBAPlayerByName } from '../../../application/SearchNBAPlayerByName';

export class NBAPlayerController {
  #useCase: SearchNBAPlayerByName;
  constructor(useCase: SearchNBAPlayerByName) {
    this.#useCase = useCase;
  }
  async searchNBAPlayerByName(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.query as { name: string };
    if (!name) return reply.code(400).send({ message: 'Name is required' });
    if (typeof name !== 'string') return reply.code(400).send({ message: 'Name must be a string' });
    if (!/^[a-zA-Z\s]+$/.test(name))
      return reply.code(400).send({ message: 'Name must contain only letters and spaces' });
    if (name.length < 2 || name.length > 50)
      return reply.code(400).send({ message: 'Name must be between 2 and 50 characters' });

    const players = await this.#useCase.execute(name);
    reply.code(200).send({ players });
  }
}
