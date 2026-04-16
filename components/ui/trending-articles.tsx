import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/api/api";

export function TrendingArticles({ articles }: { articles?: Article[] } = {}) {
  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-6 text-xl font-semibold">Trending Articles</h2>
      {articles ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex flex-col gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
            >
              {article.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded">
                  <Image
                    src={article.image}
                    alt={article.title ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div>
                <p className="line-clamp-3 text-sm font-medium leading-snug group-hover:underline">
                  {article.title}
                </p>
                {article.category && (
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {article.category.replace("-", " ")}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-lg border p-3">
              <div className="aspect-[16/9] w-full animate-pulse rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-5 w-20 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
