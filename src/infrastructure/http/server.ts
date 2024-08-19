import Fastify, { type FastifyInstance, type RouteOptions } from 'fastify';

import type { IServer } from '../../core/commons/http';

export class FastifyServer implements IServer {
  #host: string;
  #port: number;
  #server: FastifyInstance;
  #routes: RouteOptions[];

  constructor(host: string, port: number, routes: RouteOptions[]) {
    this.#host = host;
    this.#port = port;
    this.#server = Fastify();
    this.#routes = routes;
  }

  async start(): Promise<void> {
    try {
      this.#routes.forEach((route) => {
        this.#server.route(route);
      });
      await this.#server.listen({
        port: this.#port,
        host: this.#host,
      });
      console.log(`Server running at http://${this.#host}:${this.#port}`);
    } catch (error) {
      throw new Error(`Error starting server: ${(error as Error).message}`);
    }
  }

  async stop(): Promise<void> {
    await this.#server.close();
  }
}
