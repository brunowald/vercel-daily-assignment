"use client";

import { useCallback, useState } from "react";
import { SearchForm } from "@/components/search/search-form";
import { ArticleCard } from "@/components/article/article-card";
import { SearchResultsSkeleton } from "@/components/search/search-results-skeleton";
import type { Article, Category } from "@/lib/api/api";

interface SearchResultsProps {
  initialQuery: string;
  initialCategory: string;
  initialArticles: Article[];
  categories: Category[];
}

export function SearchResults({
  initialQuery,
  initialCategory,
  initialArticles,
  categories,
}: SearchResultsProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [isPending, setIsPending] = useState(false);
  const [isSearching, setIsSearching] = useState(
    !!(initialQuery || initialCategory)
  );

  function handleResults(newArticles: Article[], q: string, category: string) {
    setArticles(newArticles);
    setIsSearching(!!(q || category));
  }

  const handlePendingChange = useCallback((pending: boolean) => {
    setIsPending(pending);
  }, []);

  return (
    <>
      <SearchForm
        initialQuery={initialQuery}
        initialCategory={initialCategory}
        categories={categories}
        onResults={handleResults}
        onPendingChange={handlePendingChange}
      />

      <h2 className="mb-6 text-xl font-semibold">
        {isSearching ? "Search Results" : "Recent Articles"}
      </h2>

      {isPending ? (
        <SearchResultsSkeleton />
      ) : articles.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          {isSearching
            ? "No articles found. Try a different search term or category."
            : "No articles available."}
        </p>
      )}
    </>
  );
}
