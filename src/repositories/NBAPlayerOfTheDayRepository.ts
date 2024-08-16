import type { INBAPlayerOfTheDayRepository } from '../interfaces';
import type { NBAPlayer } from '../types';

import { prisma } from '../index';

export class NBAPlayerOfTheDayRepository implements INBAPlayerOfTheDayRepository {
  async get(): Promise<NBAPlayer | null> {
    const player = await prisma.nBAPlayerOfTheDay.findFirst();
    if (!player) return null;
    return {
      id: player.id,
      name: player.name,
      height: player.height,
      weight: player.weight,
      country: player.country,
      college: player.college,
      team: player.team,
      position: player.position,
    };
  }

  async save(player: NBAPlayer): Promise<void> {
    await prisma.nBAPlayerOfTheDay.create({
      data: {
        id: player.id,
        name: player.name,
        height: player.height,
        weight: player.weight,
        country: player.country,
        college: player.college,
        team: player.team,
        position: player.position,
      },
    });
  }

  async delete(): Promise<void> {
    await prisma.nBAPlayerOfTheDay.deleteMany();
  }
}
