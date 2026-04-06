import type { components, operations } from "./api-types";

export type Article = components["schemas"]["Article"];
export type BreakingNews = components["schemas"]["BreakingNews"];
export type Category = components["schemas"]["Category"];
export type Subscription = components["schemas"]["Subscription"];
export type ContentBlock = components["schemas"]["ContentBlock"];
export type PaginationMeta = components["schemas"]["PaginationMeta"];
export type ArticleListResponse = components["schemas"]["ArticleListResponse"];
export type ArticleResponse = components["schemas"]["ArticleResponse"];
export type BreakingNewsResponse =
  components["schemas"]["BreakingNewsResponse"];
export type CategoryListResponse =
  components["schemas"]["CategoryListResponse"];
export type SubscriptionResponse =
  components["schemas"]["SubscriptionResponse"];
export type ErrorResponse = components["schemas"]["ErrorResponse"];
export type ListArticlesParams =
  operations["listArticles"]["parameters"]["query"];
export type GetTrendingParams =
  operations["getTrendingArticles"]["parameters"]["query"];

/**
 * RequestInit with headers narrowed to a plain record.
 * This is the only shape accepted across the ApiClient surface —
 * no Headers instances, no string[][] tuples.
 */
export type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

interface ApiClientConfig {
  baseUrl: string;
  bypassToken: string;
  defaultOptions?: FetchOptions;
}

export class ApiClient {
  private baseUrl: string;
  private bypassToken: string;
  private defaultHeaders: Record<string, string>;
  private defaultInit: Omit<FetchOptions, "headers">;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.bypassToken = config.bypassToken;
    const { headers, ...rest } = config.defaultOptions ?? {};
    this.defaultHeaders = headers ?? {};
    this.defaultInit = rest;
  }

  private mergeHeaders(
    ...extra: (Record<string, string> | undefined)[]
  ): Record<string, string> {
    const merged: Record<string, string> = {
      "x-vercel-protection-bypass": this.bypassToken,
      ...this.defaultHeaders,
    };
    for (const h of extra) {
      if (h) Object.assign(merged, h);
    }
    return merged;
  }

  private async fetch<T>(path: string, init?: FetchOptions): Promise<T> {
    const { headers: callHeaders, ...callRest } = init ?? {};

    const res = await fetch(`${this.baseUrl}${path}`, {
      ...this.defaultInit,
      ...callRest,
      headers: this.mergeHeaders(callHeaders),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ErrorResponse | null;
      throw new Error(
        body?.error?.message ?? `API ${path} responded with ${res.status}`
      );
    }

    return res.json() as Promise<T>;
  }

  /**
   * Returns a paginated list of articles.
   * @param params - Filter by category, search term, featured status, page, and limit.
   * @param init - Optional fetch overrides (e.g. `{ next: { revalidate: 60 } }`).
   */
  async listArticles(
    params?: ListArticlesParams,
    init?: FetchOptions
  ): Promise<ArticleListResponse> {
    const qs = params ? this.toQueryString(params) : "";
    return this.fetch<ArticleListResponse>(
      `/articles${qs ? `?${qs}` : ""}`,
      init
    );
  }

  /**
   * Returns a single article by its ID or slug.
   * @param idOrSlug - Article ID (e.g. `4eUawbAqhHBg0OzTSNeLwv`) or slug (e.g. `building-secure-ai-agents`).
   * @param init - Optional fetch overrides.
   */
  async getArticle(
    idOrSlug: string,
    init?: FetchOptions
  ): Promise<ArticleResponse> {
    return this.fetch<ArticleResponse>(`/articles/${idOrSlug}`, init);
  }

  /**
   * Returns 4 randomly selected trending articles. Results change on every request.
   * @param params - Pass `exclude` as a comma-separated list of article IDs to omit.
   * @param init - Optional fetch overrides.
   */
  async getTrendingArticles(
    params?: GetTrendingParams,
    init?: FetchOptions
  ): Promise<{ success?: boolean; data?: Article[] }> {
    const qs = params ? this.toQueryString(params) : "";
    return this.fetch(`/articles/trending${qs ? `?${qs}` : ""}`, init);
  }

  /**
   * Returns a randomly selected breaking news item.
   * @param init - Optional fetch overrides.
   */
  async getBreakingNews(init?: FetchOptions): Promise<BreakingNewsResponse> {
    return this.fetch<BreakingNewsResponse>("/breaking-news", init);
  }

  /**
   * Returns all article categories with their article counts.
   * @param init - Optional fetch overrides.
   */
  async getCategories(init?: FetchOptions): Promise<CategoryListResponse> {
    return this.fetch<CategoryListResponse>("/categories", init);
  }

  /**
   * Creates a new inactive subscription and returns the token from the response headers.
   * @param init - Optional fetch overrides.
   */
  async createSubscription(
    init?: FetchOptions
  ): Promise<{ token: string; data: SubscriptionResponse }> {
    const { headers: callHeaders, ...callRest } = init ?? {};

    const res = await fetch(`${this.baseUrl}/subscription/create`, {
      ...this.defaultInit,
      method: "POST",
      ...callRest,
      headers: this.mergeHeaders(callHeaders),
    });

    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ErrorResponse | null;
      throw new Error(
        body?.error?.message ?? `API /subscription/create responded with ${res.status}`
      );
    }

    const token = res.headers.get("x-subscription-token");
    if (!token) throw new Error("No subscription token in response headers");

    const data = (await res.json()) as SubscriptionResponse;
    return { token, data };
  }

  /**
   * Activates a subscription (sets status to active).
   * @param token - The subscription token from {@link createSubscription}.
   * @param init - Optional fetch overrides.
   */
  async activateSubscription(
    token: string,
    init?: FetchOptions
  ): Promise<SubscriptionResponse> {
    return this.fetch<SubscriptionResponse>("/subscription", {
      method: "POST",
      ...init,
      headers: { "x-subscription-token": token, ...init?.headers },
    });
  }

  /**
   * Retrieves the current subscription status.
   * @param token - The subscription token from {@link createSubscription}.
   * @param init - Optional fetch overrides.
   */
  async getSubscription(
    token: string,
    init?: FetchOptions
  ): Promise<SubscriptionResponse> {
    return this.fetch<SubscriptionResponse>("/subscription", {
      ...init,
      headers: { "x-subscription-token": token, ...init?.headers },
    });
  }

  /**
   * Deactivates a subscription (sets status to inactive).
   * @param token - The subscription token from {@link createSubscription}.
   * @param init - Optional fetch overrides.
   */
  async deactivateSubscription(
    token: string,
    init?: FetchOptions
  ): Promise<SubscriptionResponse> {
    return this.fetch<SubscriptionResponse>("/subscription", {
      method: "DELETE",
      ...init,
      headers: { "x-subscription-token": token, ...init?.headers },
    });
  }

  private toQueryString(
    params: Record<string, string | number | boolean | undefined>
  ): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) search.set(key, String(value));
    }
    return search.toString();
  }
}

// Default singleton using environment variables
export const api = new ApiClient({
  baseUrl: process.env.API_BASE_URL ?? "",
  bypassToken: process.env.VERCEL_PROTECTION_BYPASS ?? "",
});
