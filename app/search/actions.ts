"use server";

import { cacheLife } from "next/cache";
import { api } from "@/lib/api/api";
import type { ArticleListResponse, ListArticlesParams } from "@/lib/api/api";

export async function searchArticles(
  search?: string,
  category?: NonNullable<ListArticlesParams>["category"]
): Promise<ArticleListResponse> {
  "use cache";

  cacheLife("minutes");

  return api.listArticles({ search, category, limit: 5 });
}
