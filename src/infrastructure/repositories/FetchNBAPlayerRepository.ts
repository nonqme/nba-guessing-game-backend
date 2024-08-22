import type { NBAPlayerRepository } from '../../domain/repositories/NBAPlayerRepository';
import type { FetchService } from '../../domain/services/FetchService';
import { BasicNBAPlayerDTO } from '../../domain/dtos/BasicNBAPlayerDTO';

export class FetchNBAPlayerRepository implements NBAPlayerRepository {
  #fetchService: FetchService;
  constructor(fetchService: FetchService) {
    this.#fetchService = fetchService;
  }
  async getAll(): Promise<BasicNBAPlayerDTO[]> {
    const API_URL = new URL('https://stats.nba.com/stats/playerindex');
    API_URL.searchParams.append('LeagueID', '00');
    API_URL.searchParams.append('Season', '2023-24');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await this.#fetchService.fetch(API_URL, {
        headers: { Referer: 'https://www.nba.com/' },
        method: 'GET',
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Error fetching data');

      const data = await response.json();

      return data.resultSets[0].rowSet.map(
        (player: unknown[]) =>
          new BasicNBAPlayerDTO(
            player[0] as number,
            player[2] as string,
            player[1] as string,
            `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player[0]}.png`
          )
      );
    } catch (error) {
      if ((error as Error).name === 'AbortError') throw new Error('Request timed out, please try again later');
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async searchByName(name: string): Promise<BasicNBAPlayerDTO[]> {
    const players = await this.getAll();
    const lowerCaseName = name.toLowerCase();
    return players.filter((player) => {
      const fullName = `${player.firstName.toLowerCase()} ${player.lastName.toLowerCase()}`;
      const reverseFullName = `${player.lastName.toLowerCase()} ${player.firstName.toLowerCase()}`;
      return (
        player.firstName.toLowerCase().includes(lowerCaseName) ||
        player.lastName.toLowerCase().includes(lowerCaseName) ||
        fullName.includes(lowerCaseName) ||
        reverseFullName.includes(lowerCaseName)
      );
    });
  }
}
