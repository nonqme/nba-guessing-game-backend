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
                  'COUNTRY',
                  'COLLEGE',
                  'TEAM_NAME',
                  'POSITION',
                ],
                rowSet: [[203932, 'Aaron', 'Gordon', '6-8', 'USA', 'Arizona', 'Denver Nuggets', 'F']],
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
      country: 'USA',
      college: 'Arizona',
      team: 'Denver Nuggets',
      position: 'F',
    };
    assert(players.length > 0);
    assert.deepStrictEqual(Object.keys(players[0]), Object.keys(wantedObject));
    assert.strictEqual(typeof players[0].id, typeof wantedObject.id);
    assert.strictEqual(typeof players[0].name, typeof wantedObject.name);
    assert.strictEqual(typeof players[0].height, typeof wantedObject.height);
    assert.strictEqual(typeof players[0].country, typeof wantedObject.country);
    assert.strictEqual(typeof players[0].college, typeof wantedObject.college);
    assert.strictEqual(typeof players[0].team, typeof wantedObject.team);
    assert.strictEqual(typeof players[0].position, typeof wantedObject.position);
  });

  it('should return null if player is not found on getByName', async () => {
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
                rowSet: [[203932, 'Aaron', 'Gordon', '6-8', 'USA', 'Arizona', 'Denver Nuggets', 'F']],
              },
            ],
          }),
        }) as Response,
    };
    const repository = new NBAPlayerRepository(fakeFetcher);
    const player = await repository.getByName('Kobe Bryant');
    assert.strictEqual(player, null);
  });

  it('should return player if found on getByName', async () => {
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
                  'COUNTRY',
                  'COLLEGE',
                  'TEAM_NAME',
                  'POSITION',
                ],
                rowSet: [[203932, 'Aaron', 'Gordon', '6-8', 'USA', 'Arizona', 'Denver Nuggets', 'F']],
              },
            ],
          }),
        }) as Response,
    };
    const repository = new NBAPlayerRepository(fakeFetcher);
    const player = await repository.getByName('aaron gordon');
    assert.strictEqual(player?.name, 'Aaron Gordon');
  });
});
