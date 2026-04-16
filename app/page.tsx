import { Suspense } from "react";
import { BreakingNewsBanner } from "@/components/article/breaking-news-banner";
import { BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";
import { HeroSection } from "@/components/article/hero-section";
import { FeaturedArticles } from "@/components/article/featured-articles";
import { FeaturedArticlesUI } from "@/components/ui/featured-articles";

export const metadata = {
  title: "Home",
  description:
    "Your daily source for the latest in web development and technology.",
  openGraph: {
    title: "Vercel Daily",
  },
};

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<BreakingNewsBannerUI />}>
        <BreakingNewsBanner />
      </Suspense>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <HeroSection />

<Suspense fallback={<FeaturedArticlesUI />}>
          <FeaturedArticles />
        </Suspense>
      </section>
    </>
  );
}
