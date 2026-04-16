import { getFeaturedArticles } from "@/lib/api/get-featured-articles";
import { LatestArticlesUI } from "@/components/ui/latest-articles";

export async function LatestArticles() {
  const articles = await getFeaturedArticles();
  const rest = articles.slice(1);

  return <LatestArticlesUI articles={rest} />;
}
