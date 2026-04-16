import { ArticleCard } from "@/components/article/article-card";
import type { Article } from "@/lib/api/api";

export function FeaturedArticles({ articles }: { articles?: Article[] } = {}) {
  return (
    <>
      <h2 className="mb-6 text-xl font-semibold">Featured Articles</h2>
      {articles ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
      )}
    </>
  );
}
