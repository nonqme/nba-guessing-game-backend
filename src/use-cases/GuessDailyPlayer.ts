import type { Player } from '../domain/entities/Player';
import type { IDailyPlayerRepository } from '../domain/repositories/IDailyPlayerRepository';
import type { IPlayerRepository } from '../domain/repositories/IPlayerRepository';

export type CompareStatus = 'correct' | 'incorrect' | 'partial';

export type GuessResponse = {
  result: 'incorrect' | 'correct';
  details?: {
    country: {
      value: string;
      status: CompareStatus;
    };
    age: {
      value: number;
      status: CompareStatus;
    };
    height: {
      value: string;
      status: CompareStatus;
    };
    team: {
      value: string;
      status: CompareStatus;
    };
    positions: {
      value: Player['positions'];
      status: CompareStatus;
    };
  };
};

export class GuessDailyPlayer {
  #dailyPlayerRepository: IDailyPlayerRepository;
  #playerRepository: IPlayerRepository;
  constructor(dailyPlayerRepository: IDailyPlayerRepository, playerRepository: IPlayerRepository) {
    this.#dailyPlayerRepository = dailyPlayerRepository;
    this.#playerRepository = playerRepository;
  }
  async execute(id: Player['id']): Promise<GuessResponse> {
    const dailyPlayer = await this.#dailyPlayerRepository.get();
    console.log(dailyPlayer);
    if (!dailyPlayer) throw new Error('No daily player set');

    if (dailyPlayer.id !== id) {
      const guessedPlayer = await this.#playerRepository.getPlayerById(id);
      if (!guessedPlayer) throw new Error('Player not found');

      return {
        result: 'incorrect',
        details: {
          country: {
            value: guessedPlayer.country,
            status: dailyPlayer.country === guessedPlayer.country ? 'correct' : 'incorrect',
          },
          age: { value: guessedPlayer.age, status: dailyPlayer.age === guessedPlayer.age ? 'correct' : 'incorrect' },
          height: {
            value: guessedPlayer.height,
            status: dailyPlayer.height === guessedPlayer.height ? 'correct' : 'incorrect',
          },
          team: {
            value: guessedPlayer.team,
            status: dailyPlayer.team === guessedPlayer.team ? 'correct' : 'incorrect',
          },
          positions: {
            value: guessedPlayer.positions,
            status: this.#comparePositions(dailyPlayer, guessedPlayer),
          },
        },
      };
    }
    return { result: 'correct' };
  }

  #comparePositions(dailyPlayerPositions: Player, guessedPlayerPositions: Player): CompareStatus {
    const correctPositions = dailyPlayerPositions.positions.filter((position) =>
      guessedPlayerPositions.positions.includes(position)
    );
    if (correctPositions.length === dailyPlayerPositions.positions.length) return 'correct';
    if (correctPositions.length === 0) return 'incorrect';
    return 'partial';
  }
}
