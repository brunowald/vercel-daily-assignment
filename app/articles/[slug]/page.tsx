import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { api, Article } from "@/lib/api";
import { ArticlePageShell } from "@/components/ui/article-page-shell";
import { ArticleContent } from "@/components/ui/article-content";
import { TrendingArticles } from "@/components/trending-articles";
import { Paywall } from "@/components/ui/paywall";

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

async function ArticlePageContent({ slug }: { slug: string }) {
  const { data: article } = await getArticle(slug);

  if (!article) notFound();

  // TODO: check subscription status once subscription module is implemented
  const isSubscribed = false;

  return (
    <ArticlePageShell article={article}>
      {isSubscribed ? (
        <ArticleContent blocks={article.content ?? []} />
      ) : (
        <Paywall excerpt={article.excerpt} />
      )}

      <Suspense fallback={null}>
        <TrendingArticles excludeId={article.id} />
      </Suspense>
    </ArticlePageShell>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ArticlePageShell />}>
      <ArticlePageContent slug={slug} />
    </Suspense>
  );
}
