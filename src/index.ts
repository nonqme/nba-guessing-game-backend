import 'dotenv/config';
import { buildFastifyServer } from './infrastructure/http/server';
import { NBAPlayerRoutes } from './infrastructure/http/routes/nbaPlayerRoutes';
import { NBAPlayerController } from './infrastructure/http/controllers/NBAPlayerController';
import { SearchNBAPlayerByName } from './application/SearchNBAPlayerByName';
import { FetchNBAPlayerRepository } from './infrastructure/repositories/FetchNBAPlayerRepository';
import { NodeFetchService } from './infrastructure/services/NodeFetchService';

const init = async () => {
  try {
    const fetchService = new NodeFetchService();
    const nbaPlayerRepository = new FetchNBAPlayerRepository(fetchService);
    const searchNBAPlayerByName = new SearchNBAPlayerByName(nbaPlayerRepository);
    const nbaPlayerController = new NBAPlayerController(searchNBAPlayerByName);
    const nbaPlayerRoutes = new NBAPlayerRoutes(nbaPlayerController);
    const routes = [nbaPlayerRoutes.handler.bind(nbaPlayerRoutes)];
    await buildFastifyServer(routes);
  } catch (error) {
    console.error(error);
  }
};

init();
