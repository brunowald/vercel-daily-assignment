export function SearchResultsSkeleton({ quantity = 5 }: { quantity?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: quantity }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border">
          <div className="aspect-[16/9] animate-pulse bg-muted" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-5 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
