# Vercel Daily News

A modern news publication built with Next.js 16, demonstrating the App Router, Server Components, Data Cache, and a full subscription flow.

---

## Features

| Area | Details |
|---|---|
| **Home** | Breaking news banner, hero section, featured articles grid |
| **Search** | Full-text search + category filter, URL-driven state, debounced input |
| **Articles** | Slug-based dynamic routes, rich content renderer, OG/Twitter metadata |
| **Paywall** | Subscribers see full content; non-subscribers see an excerpt + CTA |
| **Subscription** | Create → Activate → Deactivate flow backed by anonymous tokens stored in an httpOnly cookie |
| **Trending** | 4 random articles sidebar per article, current article excluded |
| **Caching** | `"use cache"` + `cacheLife()` across all data-fetching layers (`days` / `hours` / `minutes`) |
| **Streaming** | `<Suspense>` boundaries with skeleton fallbacks throughout |
| **Error handling** | Global error boundary, root 404, article-level 404, permanent slug redirect |

---

## Architecture

```
app/
├── page.tsx                   # Home — breaking news + featured articles
├── search/
│   ├── page.tsx               # Search page (SSR, URL params)
│   ├── actions.ts             # Server action: searchArticles
│   └── loading.tsx            # Loading skeleton
└── articles/[slug]/
    ├── page.tsx               # Article page + paywall + trending sidebar
    └── not-found.tsx          # Article 404

components/
├── article/                   # Server components (data-fetching wrappers)
├── search/                    # Search form + results (client)
├── shared/                    # Header, Footer
├── contexts/                  # SubscriptionProvider (optimistic state)
└── ui/                        # Pure presentational components

lib/
├── api/api.ts                 # ApiClient — typed wrapper for all endpoints
├── api/types.ts               # Auto-generated OpenAPI types
└── subscription/index.ts      # subscribe / unsubscribe / isSubscribed server actions

proxy.ts                       # Next.js 16 Proxy (Middleware) — validates token on every request
```

---

## Subscription Flow

```
User clicks Subscribe
  → POST /subscription/create     (receives token in response header)
  → POST /subscription            (activates token)
  → Token saved as httpOnly cookie

On every request (proxy.ts)
  → GET /subscription             (validates token)
  → Sets x-has-subscription-token: true|false header

Article page
  → Reads header via isSubscribed()
  → Renders <ArticleContent> or <Paywall>
```

---

## Caching Strategy

| Data | Cache profile | Reason |
|---|---|---|
| Publication config | `days` | Rarely changes |
| Article metadata | `hours` | Updated periodically |
| Categories | `hours` | Slow-moving taxonomy |
| Featured / trending articles | `minutes` | Frequently rotated |
| Search results | none | Always fresh |

---

## Tech Stack

- **Next.js 16** — App Router, Server Components, `"use cache"`, Proxy
- **React 19** — with `useOptimistic` for subscription state
- **Tailwind CSS v4** — utility-first styling
- **Radix UI + shadcn/ui** — accessible headless components
- **TypeScript** — strict types generated from OpenAPI schema

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Required environment variables (`.env.local`):

```bash
API_BASE_URL=<url>
VERCEL_PROTECTION_BYPASS=<token>
```
