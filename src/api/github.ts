import type { GitHubSearchResponse, PaginationParams } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export async function searchRepositories(
  query: string,
  pagination: PaginationParams
): Promise<GitHubSearchResponse> {
  const trimmed = query.trim() || 'stars:>1000';
  const url = new URL(`${GITHUB_API_BASE}/search/repositories`);
  url.searchParams.set('q', trimmed);
  url.searchParams.set('sort', 'stars');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('page', String(pagination.page));
  url.searchParams.set('per_page', String(pagination.perPage));

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error (${res.status}): ${text || res.statusText}`);
  }

  return res.json() as Promise<GitHubSearchResponse>;
}
