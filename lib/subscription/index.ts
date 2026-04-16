"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api/api";

const COOKIE_NAME = "x-subscription-token";

export async function isSubscribed(): Promise<boolean> {
  const headersList = await headers();
  return headersList.get("x-has-subscription-token") === "true";
}

export async function subscribe() {
  const cookieStore = await cookies();

  const { token } = await api.createSubscription();
  await api.activateSubscription(token);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}

export async function unsubscribe() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return;

  cookieStore.delete(COOKIE_NAME);
  revalidatePath("/", "layout");

  try {
    await api.deactivateSubscription(token);
  } catch {
    // Best-effort server-side deactivation; cookie is already cleared.
  }
}
