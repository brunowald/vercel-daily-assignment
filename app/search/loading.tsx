import { SearchResultsSkeleton } from "@/components/search/search-results-skeleton";

export default function SearchLoading() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 h-9 w-48 animate-pulse rounded bg-muted" />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="h-9 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
        <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="mb-6 h-7 w-36 animate-pulse rounded bg-muted" />

      <SearchResultsSkeleton />
    </section>
  );
}
