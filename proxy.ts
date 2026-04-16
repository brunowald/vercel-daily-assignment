import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "@/lib/api/api";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("x-subscription-token")?.value;
  const requestHeaders = new Headers(request.headers);

  let isActive = false;

  if (token) {
    try {
      const res = await api.getSubscription(token);
      isActive = res.data?.status === "active";
    } catch {
      // treat as inactive on error
    }
  }

  requestHeaders.set("x-has-subscription-token", isActive ? "true" : "false");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
