import type { NBAPlayer } from '../types';
import type { INBAPlayerRepository, IFetcher } from '../interfaces';

export class NBAPlayerRepository implements INBAPlayerRepository {
  #fetcher: IFetcher;
  constructor(fetcher: IFetcher) {
    this.#fetcher = fetcher;
  }
  async getAll(): Promise<NBAPlayer[]> {
    const API_URL = new URL('https://stats.nba.com/stats/playerindex');
    API_URL.searchParams.append('LeagueID', '00');
    API_URL.searchParams.append('Season', '2024-25');
    const response = await this.#fetcher.fetch(API_URL, {
      headers: { Referer: 'https://www.nba.com/' },
      body: null,
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const data: { resultSets: { headers: string[]; rowSet: [][] }[] } = await response.json();
    const keys = data.resultSets[0].headers;
    const players: Record<string, unknown>[] = data.resultSets[0].rowSet.map((player) =>
      this.#mapToNBAPlayerDTO(keys, player)
    );
    return players.map(this.#mapToNBAPlayer);
  }

  async getByName(name: string): Promise<NBAPlayer | null> {
    const players = await this.getAll();
    return players.find((player) => player.name.toLowerCase() === name.toLowerCase()) || null;
  }

  #mapToNBAPlayerDTO(keys: string[], player: []): Record<string, unknown> {
    return keys.reduce((acc: Record<string, unknown>, key: string, index: number) => {
      acc[key] = player[index];
      return acc;
    }, {});
  }

  #mapToNBAPlayer(player: Record<string, unknown>): NBAPlayer {
    return {
      id: player.PERSON_ID as number,
      name: `${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`,
      height: player.HEIGHT as string,
      weight: Number(player.WEIGHT),
      country: player.COUNTRY as string,
      college: player.COLLEGE as string,
      team: player.TEAM_NAME as string,
      position: player.POSITION as string,
    };
  }
}
