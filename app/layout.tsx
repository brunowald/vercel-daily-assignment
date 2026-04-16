import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { headers } from "next/headers";
import { SubscriptionProvider } from "@/components/contexts/subscription-provider";
import { cacheLife } from "next/cache";
import { api } from "@/lib/api/api";
import type { PublicationConfigResponse } from "@/lib/api/api";
import "./globals.css";

async function getPublicationConfig(): Promise<PublicationConfigResponse> {
  "use cache";
  cacheLife("days");

  return api.getPublicationConfig();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPublicationConfig();

  const seo = config?.data?.seo;

  const title = seo?.defaultTitle ?? "Vercel Daily";
  const description =
    seo?.defaultDescription ??
    "The latest news, tutorials, and insights for modern web developers.";
  const template = seo?.titleTemplate ?? "%s | Vercel Daily";

  return {
    metadataBase: new URL(
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000",
    ),
    title: {
      default: title,
      template,
    },
    description,
    openGraph: {
      siteName: title,
      type: "website",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}

async function SubscriptionShell({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const status = headersList.get("x-has-subscription-token") === "true" ? "active" : "inactive";
  return (
    <SubscriptionProvider initialStatus={status}>
      {children}
    </SubscriptionProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}
    >
      <head>
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Suspense fallback={<AppShell />}>
          <SubscriptionShell>
            <AppShell>{children}</AppShell>
          </SubscriptionShell>
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
