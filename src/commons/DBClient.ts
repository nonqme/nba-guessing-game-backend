/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PrismaClient } from '@prisma/client';
import { IDBClient } from '../interfaces';

export type PrismaModels = {
  nBAPlayerOfTheDay: string;
};

export class DBClient implements IDBClient {
  #prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.#prisma = prisma;
  }

  async findFirst<T>(table: keyof PrismaModels): Promise<T | null> {
    //@ts-ignore
    return this.#prisma[table].findFirst();
  }

  async create<T>(table: string, data: T): Promise<void> {
    //@ts-ignore
    await this.#prisma[table].create({ data });
  }

  async deleteMany(table: string): Promise<void> {
    //@ts-ignore
    await this.#prisma[table].deleteMany();
  }
}
