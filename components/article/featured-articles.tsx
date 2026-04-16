import { getFeaturedArticles } from "@/lib/api/get-featured-articles";
import { FeaturedArticlesUI } from "@/components/ui/featured-articles";

export async function FeaturedArticles() {
  const articles = await getFeaturedArticles();
  return <FeaturedArticlesUI articles={articles.slice(0, 6)} />;
}
