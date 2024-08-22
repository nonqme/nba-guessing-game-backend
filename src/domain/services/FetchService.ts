export interface FetchService {
  fetch(url: URL, options?: RequestInit): Promise<Response>;
}
