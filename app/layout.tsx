import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { getSubscriptionStatus } from "@/lib/subscription/get-subscription-status";
import { SubscriptionProvider } from "@/components/contexts/subscription-provider";
import "./globals.css";

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

export const metadata: Metadata = {
  title: {
    default: "Vercel Daily",
    template: "%s | Vercel Daily",
  },
  description:
    "The latest news, tutorials, and insights for modern web developers.",
  generator: "vnews-cert-v3",
  openGraph: {
    siteName: "Vercel Daily",
    type: "website",
    title: "Vercel Daily",
    description:
      "The latest news, tutorials, and insights for modern web developers.",
  },
};

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
