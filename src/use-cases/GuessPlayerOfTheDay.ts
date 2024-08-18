import { INBAPlayerOfTheDayRepository, INBAPlayerRepository } from '../interfaces';
import type { NBAPlayer, GuessingResult, GuessingAccuracy } from '../types';

export class GuessPlayerOfTheDay {
  #nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository;
  #nbaPlayerRepository: INBAPlayerRepository;
  constructor(nbaPlayerOfTheDayRepository: INBAPlayerOfTheDayRepository, nbaPlayerRepository: INBAPlayerRepository) {
    this.#nbaPlayerOfTheDayRepository = nbaPlayerOfTheDayRepository;
    this.#nbaPlayerRepository = nbaPlayerRepository;
  }

  async execute(guess: string): Promise<GuessingResult> {
    const playerOfTheDay = await this.#nbaPlayerOfTheDayRepository.get();
    if (!playerOfTheDay) {
      throw new Error('Player of the day is not set');
    }

    const player = await this.#nbaPlayerRepository.getByName(guess);
    if (!player) {
      throw new Error('Player not found');
    }

    const result: GuessingResult = {
      name: {
        value: player.name,
        correct: player.name.toLowerCase() === playerOfTheDay.name.toLowerCase() ? 'correct' : 'incorrect',
      },
      height: {
        value: player.height,
        correct: player.height.toLowerCase() === playerOfTheDay.height.toLowerCase() ? 'correct' : 'incorrect',
      },
      country: {
        value: player.country,
        correct: player.country.toLowerCase() === playerOfTheDay.country.toLowerCase() ? 'correct' : 'incorrect',
      },
      college: {
        value: player.college,
        correct: player.college.toLowerCase() === playerOfTheDay.college.toLowerCase() ? 'correct' : 'incorrect',
      },
      team: {
        value: player.team,
        correct: player.team.toLowerCase() === playerOfTheDay.team.toLowerCase() ? 'correct' : 'incorrect',
      },
      position: {
        value: player.position,
        correct: this.#checkPosition(player, playerOfTheDay),
      },
    };

    return result;
  }

  #checkPosition(player: NBAPlayer, playerOfTheDay: NBAPlayer): GuessingAccuracy {
    const playerPosition = player.position.split('-');
    const playerOfTheDayPosition = playerOfTheDay.position.split('-');
    if (playerPosition.every((position) => playerOfTheDayPosition.includes(position))) {
      return 'correct';
    } else if (playerPosition.some((position) => playerOfTheDayPosition.includes(position))) {
      return 'partial';
    } else {
      return 'incorrect';
    }
  }
}
