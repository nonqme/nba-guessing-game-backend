import { describe, it } from 'node:test';
import assert from 'node:assert';

import type { IScheduler } from '../../../src/core/commons/scheduler';
import { CronScheduler } from '../../../src/infrastructure/scheduler';

describe('CronScheduler', () => {
  const scheduler: IScheduler = new CronScheduler();
  it('should throw an error if the hour is less than 0', () => {
    assert.throws(() => {
      scheduler.scheduleEveryDayAt(-1, 0, () => {});
    });
  });

  it('should throw an error if the hour is greater than 23', () => {
    assert.throws(() => {
      scheduler.scheduleEveryDayAt(24, 0, () => {});
    });
  });

  it('should throw an error if the minute is less than 0', () => {
    assert.throws(() => {
      scheduler.scheduleEveryDayAt(0, -1, () => {});
    });
  });

  it('should throw an error if the minute is greater than 59', () => {
    assert.throws(() => {
      scheduler.scheduleEveryDayAt(0, 60, () => {});
    });
  });
});
