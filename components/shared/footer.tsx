import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Vercel Daily. All rights reserved.
      </div>
    </footer>
  );
}
