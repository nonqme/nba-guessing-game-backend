import fastify from 'fastify';

import { GuessRoute } from './routes/guessRoute';
import { MockDailyPlayerRepository } from './repositories/DailyPlayerRepository';
import { MockPlayerRepository } from './repositories/PlayerRepository';

import { GuessDailyPlayer } from './use-cases/GuessDailyPlayer';
import { SetDailyPlayer } from './use-cases/SetDailyPlayer';

export function build(opts = {}) {
  const app = fastify(opts);

  const dailyPlayerRepository = new MockDailyPlayerRepository();
  const playerRepository = new MockPlayerRepository();
  const setDailyPlayer = new SetDailyPlayer(playerRepository, dailyPlayerRepository);
  setDailyPlayer.execute();
  const guessDailyPlayer = new GuessDailyPlayer(dailyPlayerRepository, playerRepository);
  const guessRoute = new GuessRoute(guessDailyPlayer);

  app.register(guessRoute.register.bind(guessRoute));

  return app;
}
