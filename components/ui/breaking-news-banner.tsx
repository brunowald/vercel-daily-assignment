import Link from "next/link";

export function BreakingNewsBanner({
  headline,
  articleId,
}: {
  headline?: string;
  articleId?: string;
} = {}) {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 text-sm">
        <span className="shrink-0 rounded bg-destructive px-2 py-0.5 text-xs font-bold uppercase text-white">
          Breaking
        </span>
        {headline ? (
          <Link href={`/articles/${articleId}`} className="truncate hover:underline">
            {headline}
          </Link>
        ) : (
          <span className="h-4 w-64 animate-pulse rounded bg-primary-foreground/20" />
        )}
      </div>
    </div>
  );
}
