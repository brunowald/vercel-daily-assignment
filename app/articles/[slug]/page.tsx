import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { api } from "@/lib/api";
import { ArticlePageShell } from "@/components/ui/article-page-shell";
import { ArticleContent } from "@/components/ui/article-content";
import { TrendingArticles } from "@/components/trending-articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
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

  const visibleBlocks = isSubscribed
    ? (article.content ?? [])
    : (article.content ?? []).slice(0, 1);

  return (
    <ArticlePageShell
      article={{
        title: article.title ?? "",
        category: article.category ?? "",
        authorName: article.author?.name ?? "",
        date: article.publishedAt
          ? new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "",
        publishedAt: article.publishedAt ?? "",
        image: article.image ?? "",
      }}
    >
      <ArticleContent blocks={visibleBlocks} />

      {!isSubscribed && (
        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-background to-transparent" />
          <div className="rounded-lg border bg-card p-8 text-center">
            <h3 className="mb-2 text-xl font-semibold">
              Subscribe to keep reading
            </h3>
            <p className="mb-6 text-muted-foreground">
              Get unlimited access to all Vercel Daily articles.
            </p>
            {/* TODO: replace with SubscribeButton once subscription is implemented */}
            <button className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
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
