import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SubscribeButton } from "@/components/ui/subscribe-button";
import { NewsIllustration } from "@/components/ui/news-illustration";

export function HeroSectionUI() {
  return (
    <div className="mb-12 grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          The Vercel Daily
        </p>
        <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          News and insights for modern web developers.
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Changelogs, engineering deep dives, customer stories, and community
          updates — all in one place.
        </p>
        <div className="flex items-center gap-3">
          <Button asChild size="lg">
            <Link href="/search">Browse articles →</Link>
          </Button>
          <SubscribeButton size="lg" />
        </div>
      </div>

      <div className="hidden md:block">
        <NewsIllustration className="w-full" />
      </div>
    </div>
  );
}
