import type { INBAPlayerService } from '../interfaces';
import type { NBAPlayer } from '../types';

export class NBAPlayerService implements INBAPlayerService {
  async getRandomNBAPlayer(): Promise<NBAPlayer> {
    const API_URL = new URL('https://stats.nba.com/stats/playerindex');
    API_URL.searchParams.append('LeagueID', '00');
    API_URL.searchParams.append('Season', '2024-25');
    const response = await fetch(API_URL, {
      headers: { Referer: 'https://www.nba.com/' },
      body: null,
      method: 'GET',
    });
    if (!response.ok) throw new Error('Failed to fetch data');
    const data = await response.json();
    const keys = data.resultSets[0].headers;
    const players = data.resultSets[0].rowSet;
    const randomIndex = Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomIndex];

    const playerObject = Object.fromEntries(
      keys.map((key: unknown, index: string | number) => [
        key,
        randomPlayer[index],
      ])
    );

    return {
      id: playerObject.PERSON_ID,
      name:
        playerObject.PLAYER_FIRST_NAME + ' ' + playerObject.PLAYER_LAST_NAME,
      team: playerObject.TEAM_ABBREVIATION,
      position: playerObject.POSITION,
      height: playerObject.HEIGHT,
      weight: playerObject.WEIGHT,
      college: playerObject.COLLEGE,
      country: playerObject.COUNTRY,
      draftYear: playerObject.DRAFT_YEAR,
      draftRound: playerObject.DRAFT_ROUND,
      draftNumber: playerObject.DRAFT_NUMBER,
    } as NBAPlayer;
  }
}
