import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { headers } from "next/headers";
import { api, Article } from "@/lib/api/api";
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

  return api.getArticle(slug).catch(() => ({ data: undefined }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: article } = await getArticle(slug);

  if (!article) return { title: "Article Not Found" };
  
  const title = article.title?.trim() ?? undefined;
  const ogTitle = title ? `${title} | Vercel Daily` : undefined;

  return {
    title,
    description: article.excerpt,
    openGraph: {
      title: ogTitle,
      description: article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.publishedAt ?? undefined,
      images: article.image ? [article.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: article.excerpt ?? undefined,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const { data: article } = await getArticle(slug);
  const headersList = await headers();
  const isSubscribed = headersList.get("x-has-subscription-token") === "true";

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
