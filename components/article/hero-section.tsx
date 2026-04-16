import { getFeaturedArticles } from "@/lib/api/get-featured-articles";
import { HeroSectionUI } from "@/components/ui/hero-section";

export async function HeroSection() {
  const articles = await getFeaturedArticles();
  const hero = articles[0];

  if (!hero) return null;

  return <HeroSectionUI article={hero} />;
}
