"use client";

import { createContext, useContext, useTransition, useOptimistic } from "react";
import { subscribeAction, unsubscribeAction } from "@/lib/subscription";

interface SubscriptionContextValue {
  status: "active" | "inactive";
  isPending: boolean;
  toggle: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  status: "inactive",
  isPending: false,
  toggle: () => {},
});

export function useSubscription() {
  return useContext(SubscriptionContext);
}

interface SubscriptionProviderProps {
  initialStatus: "active" | "inactive";
  children: React.ReactNode;
}

export function SubscriptionProvider({
  initialStatus,
  children,
}: SubscriptionProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(initialStatus);

  function toggle() {
    const next = optimisticStatus === "active" ? "inactive" : "active";
    
    startTransition(async () => {
      setOptimisticStatus(next);
      
      if (optimisticStatus === "active") {
        await unsubscribeAction();
      } else {
        await subscribeAction();
      }
    });
  }

  return (
    <SubscriptionContext value={{ status: optimisticStatus, isPending, toggle }}>
      {children}
    </SubscriptionContext>
  );
}
