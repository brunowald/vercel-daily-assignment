export function SearchResultsSkeleton({ quantity = 5 }: { quantity?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: quantity }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-card">
          <div className="relative aspect-[16/9] animate-pulse bg-muted" />
          <div className="p-4">
            <div className="mb-2 h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="mb-1 h-5 w-full animate-pulse rounded bg-muted" />
            <div className="mb-1 h-4 w-full animate-pulse rounded bg-muted" />
            <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="flex items-center gap-2">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
