import { Star, GitFork, AlertCircle, ExternalLink } from 'lucide-react';
import type { GitHubRepo } from '../types/github';

interface RepoTableProps {
  repos: GitHubRepo[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return String(n);
}

function languageColor(language: string | null) {
  const colors: Record<string, string> = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-400',
    Python: 'bg-blue-500',
    Java: 'bg-orange-500',
    Go: 'bg-cyan-400',
    Rust: 'bg-orange-700',
    C: 'bg-gray-600',
    'C++': 'bg-pink-500',
    'C#': 'bg-green-500',
    PHP: 'bg-indigo-400',
    Ruby: 'bg-red-600',
    Swift: 'bg-orange-400',
    Kotlin: 'bg-purple-500',
    Dart: 'bg-cyan-600',
    Shell: 'bg-gray-400',
    HTML: 'bg-orange-600',
    CSS: 'bg-purple-600',
    Vue: 'bg-green-400',
    Svelte: 'bg-orange-500',
    'Jupyter Notebook': 'bg-orange-400',
  };
  return colors[language || ''] || 'bg-gray-400';
}

export function RepoTable({ repos }: RepoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <tr>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Repository</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Language</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden md:table-cell">Stars</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Forks</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden md:table-cell">Issues</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Updated</th>
            <th className="px-4 py-3 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider text-right">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {repos.map((repo) => (
            <tr
              key={repo.id}
              className="bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={repo.owner.avatar_url}
                    alt={repo.owner.login}
                    className="h-8 w-8 rounded-full"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{repo.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{repo.owner.login}</p>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 sm:hidden">
                  {repo.description || 'No description'}
                </p>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <div className="flex items-center gap-1.5">
                  {repo.language && (
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${languageColor(repo.language)}`} />
                  )}
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{repo.language || 'N/A'}</span>
                </div>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <div className="flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <Star className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="font-medium">{formatNumber(repo.stargazers_count)}</span>
                </div>
              </td>
              <td className="px-4 py-3 hidden lg:table-cell">
                <div className="flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <GitFork className="h-3.5 w-3.5 text-blue-500" />
                  <span className="font-medium">{formatNumber(repo.forks_count)}</span>
                </div>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <div className="flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  <span className="font-medium">{formatNumber(repo.open_issues_count)}</span>
                </div>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">{formatDate(repo.updated_at)}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Open ${repo.name} on GitHub`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
