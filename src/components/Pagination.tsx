import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  perPage: number;
}

const BTN_BASE =
  'p-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors';

const PAGE_BTN = (active: boolean) =>
  `min-w-[2.5rem] h-9 px-2.5 rounded-md text-sm font-medium transition-colors border ${
    active
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700'
  }`;

function buildPages(page: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
  if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', page - 1, page, page + 1, '...', totalPages];
}

export function Pagination({ page, totalPages, onPageChange, totalResults, perPage }: PaginationProps) {
  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalResults);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{totalResults.toLocaleString()}</span> results
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={BTN_BASE} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, idx) =>
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-neutral-400 dark:text-neutral-500">…</span>
          ) : (
            <button key={p} onClick={() => onPageChange(p)} className={PAGE_BTN(p === page)}>
              {p}
            </button>
          )
        )}

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className={BTN_BASE} aria-label="Next page">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
