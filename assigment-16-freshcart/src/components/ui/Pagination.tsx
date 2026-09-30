"use client";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="size-10 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        aria-label="Previous page"
      >
        <IconChevronLeft size={18} />
      </button>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showEllipsis = prev !== undefined && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {showEllipsis && <span className="text-gray-400">...</span>}
            <button
              onClick={() => onPageChange(p)}
              className={cn(
                "size-10 rounded-lg font-medium transition-colors",
                p === page
                  ? "bg-primary-600 text-white"
                  : "border border-gray-200 hover:bg-gray-50 text-gray-700"
              )}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="size-10 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
        aria-label="Next page"
      >
        <IconChevronRight size={18} />
      </button>
    </nav>
  );
}
