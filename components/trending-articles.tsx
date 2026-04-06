import { cacheLife } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";

interface TrendingArticlesProps {
  excludeId?: string;
}

export async function TrendingArticles({ excludeId }: TrendingArticlesProps) {
  "use cache";
  cacheLife("minutes");

  const { data: articles } = await api.getTrendingArticles(
    excludeId ? { exclude: excludeId } : undefined
  );

  if (!articles?.length) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="mb-6 text-xl font-semibold">Trending Articles</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group flex gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
          >
            {article.image && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                <Image
                  src={article.image}
                  alt={article.title ?? ""}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium leading-snug group-hover:underline">
                {article.title}
              </p>
              <p className="mt-1 text-xs capitalize text-muted-foreground">
                {article.category?.replace("-", " ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
