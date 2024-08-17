import { describe, it } from 'node:test';
import assert from 'node:assert';

import { NBAPlayerRepository } from '../src/repositories/NBAPlayerRepository';
import type { IFetcher } from '../src/interfaces';

describe('NBAPlayerRepository', () => {
  it('should fetch NBA players', async () => {
    const fakeFetcher: IFetcher = {
      fetch: async () =>
        ({
          ok: true,
          json: async () => ({
            resultSets: [
              {
                headers: [
                  'PERSON_ID',
                  'PLAYER_FIRST_NAME',
                  'PLAYER_LAST_NAME',
                  'HEIGHT',
                  'WEIGHT',
                  'COUNTRY',
                  'COLLEGE',
                  'TEAM_NAME',
                  'POSITION',
                ],
                rowSet: [[203932, 'Aaron', 'Gordon', '6-8', 235, 'USA', 'Arizona', 'Denver Nuggets', 'F']],
              },
            ],
          }),
        }) as Response,
    };
    const repository = new NBAPlayerRepository(fakeFetcher);
    const players = await repository.getAll();
    const wantedObject = {
      id: 203932,
      name: 'Aaron Gordon',
      height: '6-8',
      weight: 235,
      country: 'USA',
      college: 'Arizona',
      team: 'Denver Nuggets',
      position: 'F',
    };
    assert(players.length > 0);
    assert.deepStrictEqual(Object.keys(players[0]), Object.keys(wantedObject));
    assert.strictEqual(typeof players[0].id, 'number');
    assert.strictEqual(typeof players[0].name, 'string');
    assert.strictEqual(typeof players[0].height, 'string');
    assert.strictEqual(typeof players[0].weight, 'number');
    assert.strictEqual(typeof players[0].country, 'string');
    assert.strictEqual(typeof players[0].college, 'string');
    assert.strictEqual(typeof players[0].team, 'string');
    assert.strictEqual(typeof players[0].position, 'string');
  });
});
