import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { api } from "@/lib/api/api";
import { TrendingArticles as TrendingArticlesUI } from "@/components/ui/trending-articles";

interface TrendingArticlesProps {
  excludeId?: string;
}

export function TrendingArticles({ excludeId }: TrendingArticlesProps) {
  return (
    <Suspense fallback={<TrendingArticlesUI />}>
      <TrendingArticlesContent excludeId={excludeId} />
    </Suspense>
  );
}

async function TrendingArticlesContent({ excludeId }: TrendingArticlesProps) {
  "use cache";
  cacheLife("minutes");

  const { data: articles } = await api.getTrendingArticles(
    excludeId ? { exclude: excludeId } : undefined,
  );

  if (!articles?.length) return null;

  return <TrendingArticlesUI articles={articles} />;
}
