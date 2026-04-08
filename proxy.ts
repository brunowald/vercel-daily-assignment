import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/articles/")) {
    const token = request.cookies.get("x-subscription-token")?.value;
    const requestHeaders = new Headers(request.headers);
    
    requestHeaders.set("x-has-subscription-token", token ? "true" : "false");
    
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
