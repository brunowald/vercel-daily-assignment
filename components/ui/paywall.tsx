interface PaywallProps {
  excerpt?: string;
}

export function Paywall({ excerpt }: PaywallProps) {
  return (
    <>
      {excerpt && <p className="text-muted-foreground">{excerpt}</p>}

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="rounded-lg border bg-card p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold">
            Subscribe to keep reading
          </h3>
          <p className="mb-6 text-muted-foreground">
            Get unlimited access to all Vercel Daily articles.
          </p>
          {/* TODO: replace with SubscribeButton once subscription is implemented */}
          <button className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
}
