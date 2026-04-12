import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { getSubscriptionStatus } from "@/lib/subscription/get-subscription-status";
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
  let title = "Vercel Daily";
  let description =
    "The latest news, tutorials, and insights for modern web developers.";
  let template = "%s | Vercel Daily";

  try {
    const config = await getPublicationConfig();
    const seo = config.data?.seo;
    if (seo?.defaultTitle) title = seo.defaultTitle;
    if (seo?.defaultDescription) description = seo.defaultDescription;
    if (seo?.titleTemplate) template = seo.titleTemplate;
  } catch {
    // fallback to hardcoded defaults above
  }

  return {
    metadataBase: new URL(
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000"
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

async function SubscriptionShell({ children }: { children: React.ReactNode }) {
  const status = await getSubscriptionStatus();
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <head>
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Suspense>
          <SubscriptionShell>
            <Header />
            <main className="flex-1">{children}</main>
          </SubscriptionShell>
        </Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
