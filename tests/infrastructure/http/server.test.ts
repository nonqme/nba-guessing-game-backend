import { describe, it } from 'node:test';
import assert from 'node:assert';

import { IServer } from '../../../src/core/commons/http';
import { FastifyServer } from '../../../src/infrastructure/http/server';
import type { RouteOptions } from 'fastify';

describe('FastifyServer', () => {
  const TEST_HOST: string = 'localhost';
  const TEST_PORT: number = 3000;
  const TEST_URL: URL = new URL(`http://${TEST_HOST}:${TEST_PORT}`);
  const route: RouteOptions = {
    method: 'GET',
    url: '/health',
    schema: {
      querystring: {},
      response: {},
    },
    handler: (_request, reply) => {
      reply.send('ok');
    },
  };
  const server: IServer = new FastifyServer(TEST_HOST, TEST_PORT, [route]);
  it('should start the server', async () => {
    try {
      await server.start();
      const reponse = await fetch(TEST_URL);
      // We expect a 404 response because we haven't defined any routes
      assert.strictEqual(reponse.status, 404);
    } catch (error) {
      // If the server fails to start, we should fail the test
      assert.ok(false, (error as Error).message);
    }
  });

  it('should return ok on /health', async () => {
    try {
      const response = await fetch(new URL('/health', TEST_URL));
      const body = await response.text();
      assert.strictEqual(body, 'ok');
    } catch (error) {
      // If the server fails to start, we should fail the test
      assert.ok(false, (error as Error).message);
    }
  });

  it('should stop the server', async () => {
    try {
      await server.stop();
      await fetch(TEST_URL);
    } catch (error) {
      // Fetch should fail because the server is no longer running
      assert.ok(true, (error as Error).message);
    }
  });
});
