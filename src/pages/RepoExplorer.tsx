import { useState, useEffect, useCallback } from 'react';
import { searchRepositories } from '../api/github';
import type { GitHubRepo } from '../types/github';
import { SearchBar } from '../components/SearchBar';
import { RepoTable } from '../components/RepoTable';
import { Pagination } from '../components/Pagination';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

const PER_PAGE = 15;

export function RepoExplorer() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRepositories(query, { page, perPage: PER_PAGE });
      setRepos(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(
        typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string'
          ? err.message
          : 'Failed to fetch repositories'
      );
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.min(Math.ceil(totalCount / PER_PAGE), Math.floor(1000 / PER_PAGE)); // GitHub API hard cap: 1000 results

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Explore GitHub Repositories
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
            Search and discover popular open-source projects from GitHub.
          </p>
          <SearchBar onSearch={handleSearch} initialQuery={query} loading={loading} />
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          {loading && !repos.length ? (
            <Loading message="Loading repositories..." />
          ) : error ? (
            <Error message={error} onRetry={fetchData} />
          ) : repos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No repositories found.</p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Try a different search query.
              </p>
            </div>
          ) : (
            <>
              <RepoTable repos={repos} />
              <div className="border-t border-neutral-200 dark:border-neutral-700">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalResults={totalCount}
                  perPage={PER_PAGE}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
