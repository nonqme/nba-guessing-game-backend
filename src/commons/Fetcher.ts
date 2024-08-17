import { IFetcher } from '../interfaces';

export class Fetcher implements IFetcher {
  async fetch(url: URL, options: RequestInit): Promise<Response> {
    return fetch(url, options);
  }
}
