import { Suspense } from "react";
import { BreakingNewsBanner } from "@/components/article/breaking-news-banner";
import { BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";
import { HeroSection } from "@/components/article/hero-section";
import { HeroSectionUI } from "@/components/ui/hero-section";
import { LatestArticles } from "@/components/article/latest-articles";
import { LatestArticlesUI } from "@/components/ui/latest-articles";

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
        <Suspense fallback={<HeroSectionUI />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<LatestArticlesUI />}>
          <LatestArticles />
        </Suspense>
      </section>
    </>
  );
}
