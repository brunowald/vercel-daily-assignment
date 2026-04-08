import { api } from "@/lib/api/api";
import { BreakingNewsBanner as BreakingNewsBannerUI } from "@/components/article/breaking-news-banner-ui";

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
