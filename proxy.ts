import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("x-subscription-token")?.value;
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-has-subscription-token", token ? "true" : "false");

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
