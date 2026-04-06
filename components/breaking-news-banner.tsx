import { api } from "@/lib/api";
import { BreakingNewsBanner as BreakingNewsBannerUI } from "@/components/ui/breaking-news-banner";

export async function BreakingNewsBanner() {
  const { data: news } = await api.getBreakingNews();
  if (!news?.headline || !news?.articleId) return null;

  return (
    <BreakingNewsBannerUI
      headline={{
        title: news.headline,
        href: `/articles/${news.articleId}`,
      }}
    />
  );
}
