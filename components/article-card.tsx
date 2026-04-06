import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/api";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent"
    >
      {article.image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title ?? ""}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-4">
        {article.category && (
          <Badge variant="secondary" className="mb-2 text-xs capitalize">
            {article.category.replace("-", " ")}
          </Badge>
        )}
        <h3 className="mb-1 font-semibold leading-snug group-hover:underline">
          {article.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {article.author?.name && <span>{article.author.name}</span>}
          {date && (
            <>
              <span>&middot;</span>
              <time dateTime={article.publishedAt}>{date}</time>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
