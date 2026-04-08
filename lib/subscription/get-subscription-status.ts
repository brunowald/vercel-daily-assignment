import { cookies } from "next/headers";
import { api } from "@/lib/api/api";

const COOKIE_NAME = "x-subscription-token";

export async function getSubscriptionStatus(): Promise<"active" | "inactive"> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) return "inactive";

  try {
    const { data } = await api.getSubscription(token);

    return data?.status ?? "inactive";
  } catch {
    return "inactive";
  }
}
