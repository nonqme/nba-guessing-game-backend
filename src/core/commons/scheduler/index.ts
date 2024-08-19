export interface IScheduler {
  scheduleEveryDayAt(hour: number, minute: number, callback: () => void): void;
}
