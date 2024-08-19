import Fastify, { type FastifyInstance, type RouteOptions } from 'fastify';

import type { IServer } from '../../core/commons/http';
import type { IScheduler } from '../../core/commons/scheduler';

export class FastifyServer implements IServer {
  #host: string;
  #port: number;
  #server: FastifyInstance;
  #routes: RouteOptions[];
  #scheduler: IScheduler;

  constructor(host: string, port: number, routes: RouteOptions[], scheduler: IScheduler) {
    this.#host = host;
    this.#port = port;
    this.#server = Fastify();
    this.#routes = routes;
    this.#scheduler = scheduler;
  }

  async start(): Promise<void> {
    try {
      // Schedule a task to run every day at 00:00
      const HOUR = 0;
      const MINUTE = 0;
      this.#scheduler.scheduleEveryDayAt(HOUR, MINUTE, () => {
        console.log('Hello, world!');
      });

      // Register the routes
      this.#routes.forEach((route) => {
        this.#server.route(route);
      });

      // Start the server
      await this.#server.listen({
        port: this.#port,
        host: this.#host,
      });

      // Log the server URL
      console.log(`Server running at http://${this.#host}:${this.#port}`);
    } catch (error) {
      throw new Error(`Error starting server: ${(error as Error).message}`);
    }
  }

  async stop(): Promise<void> {
    await this.#server.close();
  }
}
