// src/components/Pagination/index.tsx
import React from "react";

type Props = {
  total: number;
  page: number;
  limit: number;
  onPageChange: (next: number) => void;
};

export function Pagination({ total, page, limit, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // small page window
  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  if (end - start < windowSize - 1) start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav aria-label="Paginação" className="flex items-center gap-2 mt-6">
      <button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        className="px-3 py-1 rounded border"
        aria-label="Página anterior"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded border"
          >
            1
          </button>
          {start > 2 && <span className="px-2">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`px-3 py-1 rounded border ${
            p === page
              ? "font-bold bg-[color:var(--color-primary)] text-white"
              : ""
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">…</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded border"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        className="px-3 py-1 rounded border"
        aria-label="Próxima página"
      >
        Next
      </button>
    </nav>
  );
}
