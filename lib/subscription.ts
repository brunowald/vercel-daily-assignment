"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { api } from "@/lib/api";

const COOKIE_NAME = "x-subscription-token";

export async function subscribeAction() {
  const cookieStore = await cookies();

  const { token } = await api.createSubscription();
  await api.activateSubscription(token);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}

export async function unsubscribeAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) return;

  await api.deactivateSubscription(token);
  
  cookieStore.delete(COOKIE_NAME);
  revalidatePath("/", "layout");
}

