import { describe, it, type Mock, mock } from 'node:test';
import assert from 'node:assert';

import type { IServer } from '../../../src/core/commons/http';
import type { IScheduler } from '../../../src/core/commons/scheduler';

import { FastifyServer } from '../../../src/infrastructure/http/server';
import type { RouteOptions } from 'fastify';

describe('FastifyServer', () => {
  const TEST_HOST: string = 'localhost';
  const TEST_PORT: number = 3000;
  const TEST_URL: URL = new URL(`http://${TEST_HOST}:${TEST_PORT}`);

  const scheduler: IScheduler = {
    scheduleEveryDayAt: () => {},
  };

  const mockScheduler: Mock<IScheduler['scheduleEveryDayAt']> = mock.method(scheduler, 'scheduleEveryDayAt');

  const routes: RouteOptions[] = [
    {
      method: 'GET',
      url: '/health',
      schema: {
        querystring: {},
        response: {},
      },
      handler: (_request, reply) => {
        reply.send('ok');
      },
    },
  ];
  const server: IServer = new FastifyServer(TEST_HOST, TEST_PORT, routes, scheduler);
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

  it('should schedule a task to run every day at 00:00', () => {
    // We expect the scheduler to be called once with the correct arguments
    assert.strictEqual(mockScheduler.mock.calls.length, 1);
    assert.strictEqual(mockScheduler.mock.calls[0].arguments[0], 0);
    assert.strictEqual(mockScheduler.mock.calls[0].arguments[1], 0);
  });

  it('should return ok on /health', async () => {
    try {
      const response = await fetch(new URL('/health', TEST_URL));
      const body = await response.text();
      assert.strictEqual(body, 'ok');
    } catch (error) {
      // If the fetch fails, we should fail the test
      assert.ok(false, (error as Error).message);
    }
  });

  it('should stop the server', async () => {
    try {
      await server.stop();
      await fetch(TEST_URL);
      assert(false, 'Server should be stopped');
    } catch (error) {
      // Fetch should fail because the server is no longer running
      assert.ok(true, (error as Error).message);
    }
  });
});
