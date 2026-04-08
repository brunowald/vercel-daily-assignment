"use client";

import { useState, useEffect, useRef, useMemo, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { debounce } from "@/lib/utils";
import { searchArticles } from "@/app/search/actions";
import type { Article, Category } from "@/lib/api/api";

interface SearchFormProps {
  initialQuery: string;
  initialCategory: string;
  categories: Category[];
  onResults: (articles: Article[], query: string, category: string) => void;
  onPendingChange: (pending: boolean) => void;
}

export function SearchForm({
  initialQuery,
  initialCategory,
  categories,
  onResults,
  onPendingChange,
}: SearchFormProps) {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const categoryRef = useRef(category);
  categoryRef.current = category;

  useEffect(() => {
    onPendingChange(isPending);
  }, [isPending, onPendingChange]);

  const debouncedSearch = useMemo(
    () =>
      debounce<(q: string) => void>((q: string) => {
        triggerSearch(q, categoryRef.current);
      }, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function buildUrl(q: string, category: string) {
    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (category) params.set("category", category);

    const queryString = params.toString();

    return `/search${queryString ? `?${queryString}` : ""}`;
  }

  function performSearch(q: string, category: string) {
    startTransition(async () => {
      const { data: articles } = await searchArticles(
        q || undefined,
        (category || undefined) as Parameters<typeof searchArticles>[1],
      );

      onResults(articles ?? [], q, category);
    });
  }

  function triggerSearch(q: string, category: string) {
    window.history.pushState(null, "", buildUrl(q, category));
    performSearch(q, category);
  }

  function handleInputChange(value: string) {
    setQuery(value);

    if (value.length >= 3 || value.length === 0) {
      debouncedSearch(value);
    }
  }

  function handleCategoryChange(newCategory: string) {
    setCategory(newCategory);
    triggerSearch(query, newCategory);
  }

  function handleSubmit() {
    triggerSearch(query, category);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  useEffect(() => {
    function handlePopState() {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q") ?? "";
      const cat = params.get("category") ?? "";

      setQuery(q);
      setCategory(cat);
      performSearch(q, cat);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onPendingChange(isPending);
  }, [isPending, onPendingChange]);

  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
      <select
        value={category}
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
      />

      <Button onClick={handleSubmit} disabled={isPending} className="h-9">
        {isPending ? <Spinner className="size-4" /> : "Search"}
      </Button>
    </div>
  );
}
