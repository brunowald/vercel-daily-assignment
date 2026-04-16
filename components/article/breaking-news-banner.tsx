import { api } from "@/lib/api/api";
import { BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";

export async function BreakingNewsBanner() {
  const { data: news } = await api.getBreakingNews();

  if (!news?.headline) return null;

  return <BreakingNewsBannerUI headline={news.headline} articleId={news.articleId} />;
}
