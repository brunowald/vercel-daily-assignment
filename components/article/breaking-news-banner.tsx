import { api } from "@/lib/api/api";
import { BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";

export async function BreakingNewsBanner() {
  const result = await api.getBreakingNews().catch(() => null);
  const news = result?.data;

  if (!news?.headline) return null;

  return <BreakingNewsBannerUI headline={news.headline} articleId={news.articleId} />;
}
