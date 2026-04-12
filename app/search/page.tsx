import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { api } from "@/lib/api/api";
import type { CategoryListResponse } from "@/lib/api/api";
import { SearchResults } from "@/components/search/search-results";
import { searchArticles } from "./actions";

export const metadata: Metadata = {
  title: "Search",
  description: "Search articles on Vercel Daily.",
  openGraph: {
    title: "Search | Vercel Daily",
  },
};

async function fetchCategories(): Promise<CategoryListResponse> {
  "use cache";

  cacheLife("hours");

  return api.getCategories();
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category } = await searchParams;

  const [{ data: articles }, { data: categories }] = await Promise.all([
    searchArticles(q, category as Parameters<typeof searchArticles>[1]),
    fetchCategories(),
  ]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Search</h1>

      <SearchResults
        initialQuery={q ?? ""}
        initialCategory={category ?? ""}
        initialArticles={articles ?? []}
        categories={categories ?? []}
      />
    </section>
  );
}
