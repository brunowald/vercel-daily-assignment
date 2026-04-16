import { Suspense } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { api, Article } from "@/lib/api/api";
import { isSubscribed } from "@/lib/subscription";
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

async function ArticleDetails({ slug }: { slug: string }) {
  const [{ data: article }, subscribed] = await Promise.all([
    getArticle(slug),
    isSubscribed(),
  ]);

  if (!article) notFound();
  if (slug !== article.slug) permanentRedirect(`/articles/${article.slug}`);

  return (
    <ArticlePageShell article={article}>
      {subscribed ? (
        <ArticleContent blocks={article.content ?? []} />
      ) : (
        <Paywall excerpt={article.excerpt} />
      )}
      <TrendingArticles excludeId={article.id} />
    </ArticlePageShell>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ArticlePageShell />}>
      <ArticleDetails slug={slug} />
    </Suspense>
  );
}
