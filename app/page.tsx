import { Suspense } from "react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api/api";
import { ArticleCard } from "@/components/article/article-card";
import { BreakingNewsBanner } from "@/components/article/breaking-news-banner";
import { BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";

export const metadata = {
  title: "Home",
  description:
    "Your daily source for the latest in web development and technology.",
  openGraph: {
    title: "Vercel Daily",
  },
};

export default async function HomePage() {
  "use cache";
  cacheLife("minutes");

  const { data: articles } = await api.listArticles({ featured: "true" });
  const [hero, ...rest] = articles ?? [];

  return (
    <>
      <Suspense fallback={<BreakingNewsBannerUI />}>
        <BreakingNewsBanner />
      </Suspense>

      <section className="mx-auto max-w-5xl px-4 py-12">
        {hero && (
          <Link
            href={`/articles/${hero.slug}`}
            className="group mb-12 grid gap-6 md:grid-cols-2 md:items-center"
          >
            {hero.image && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={hero.image}
                  alt={hero.title ?? ""}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Featured
              </p>
              <h1 className="mb-3 text-3xl font-bold leading-tight group-hover:underline">
                {hero.title}
              </h1>
              <p className="text-muted-foreground">{hero.excerpt}</p>
            </div>
          </Link>
        )}

        <h2 className="mb-6 text-xl font-semibold">Latest Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
