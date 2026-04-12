"use client";

import { useSubscription } from "@/components/contexts/subscription-provider";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SubscribeButton({ size = "sm" }: { size?: "default" | "sm" | "lg" }) {
  const { status, isPending, toggle } = useSubscription();
  const isSubscribed = status === "active";

  return (
    <Button
      onClick={toggle}
      disabled={isPending}
      variant={isSubscribed ? "outline" : "default"}
      size={size}
    >
      {isPending ? (
        <Spinner />
      ) : isSubscribed ? (
        "Unsubscribe"
      ) : (
        "Subscribe"
      )}
    </Button>
  );
}
