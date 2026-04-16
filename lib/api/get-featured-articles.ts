import { cacheLife } from "next/cache";
import { api } from "@/lib/api/api";

export async function getFeaturedArticles() {
  "use cache";
  cacheLife("minutes");

  const { data: articles } = await api.listArticles({ featured: "true", limit: 6 });
  return articles ?? [];
}
