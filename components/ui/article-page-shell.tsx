import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/api";

interface ArticlePageShellProps {
  article?: Article;
  children?: React.ReactNode;
}

export function ArticlePageShell({ article, children }: ArticlePageShellProps) {
  if (!article) return <ArticleSkeleton />;

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <Badge variant="secondary" className="mb-3 capitalize">
          {article.category?.replace("-", " ")}
        </Badge>
        <h1 className="mb-4 text-4xl font-bold leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {article.author?.name && <span>{article.author.name}</span>}
          {date && (
            <>
              <span>&middot;</span>
              <time dateTime={article.publishedAt}>{date}</time>
            </>
          )}
        </div>
      </header>

      {article.image && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={article.image}
            alt={article.title ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {children}
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <div className="mb-3 h-6 w-24 animate-pulse rounded bg-muted" />
        <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-48 animate-pulse rounded bg-muted" />
      </header>
      <div className="mb-8 aspect-[16/9] w-full animate-pulse rounded-lg bg-muted" />
      <div className="space-y-4">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
