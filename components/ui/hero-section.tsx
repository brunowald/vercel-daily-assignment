import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/api/api";

export function HeroSectionUI({ article }: { article?: Article } = {}) {
  if (!article) {
    return (
      <div className="group mb-12 grid gap-6 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[16/9] animate-pulse rounded-lg bg-muted" />
        <div>
          <div className="mb-2 h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="mb-3 h-9 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group mb-12 grid gap-6 md:grid-cols-2 md:items-center"
    >
      {article.image && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={article.image}
            alt={article.title ?? ""}
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
          {article.title}
        </h1>
        <p className="text-muted-foreground">{article.excerpt}</p>
      </div>
    </Link>
  );
}
