import type { FetchService } from '../../domain/services/FetchService';

export class NodeFetchService implements FetchService {
  async fetch(url: URL, options?: RequestInit): Promise<Response> {
    return await fetch(url.toString(), options);
  }
}
