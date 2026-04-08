import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { api, Article } from "@/lib/api/api";
import { getSubscriptionStatus } from "@/lib/subscription/get-subscription-status";
import { ArticlePageShell } from "@/components/article/article-page-shell";
import { ArticleContent } from "@/components/article/article-content";
import { TrendingArticles } from "@/components/article/trending-articles";
import { Paywall } from "@/components/article/paywall";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(
  slug: string,
): Promise<{ success?: boolean; data?: Article }> {
  "use cache";
  cacheLife("hours");
  cacheTag(`article-${slug}`);

  return api.getArticle(slug);
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: article } = await getArticle(slug);

  if (!article) return { title: "Article Not Found" };
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title ?? undefined,
      description: article.excerpt ?? undefined,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { data: article } = await getArticle(slug);
  const status = await getSubscriptionStatus();
  const isSubscribed = status === "active";

  if (!article) notFound();

  return (
    <Suspense fallback={<ArticlePageShell />}>
      <ArticlePageShell article={article}>
        {isSubscribed ? (
          <ArticleContent blocks={article.content ?? []} />
        ) : (
          <Paywall excerpt={article.excerpt} />
        )}
        <TrendingArticles excludeId={article.id} />
      </ArticlePageShell>
    </Suspense>
  );
}
