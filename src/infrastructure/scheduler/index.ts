import type { IScheduler } from '../../core/commons/scheduler';
import cron from 'node-cron';

export class CronScheduler implements IScheduler {
  scheduleEveryDayAt(hour: number, minute: number, callback: () => void): void {
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59)
      throw new Error('The hour and minute must be between 0 and 23 and 0 and 59, respectively');
    cron.schedule(`${minute} ${hour} * * *`, callback);
  }
}
