import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin");
  const isApiAdmin = ["/api/projects", "/api/settings", "/api/services", "/api/upload"].some(api => pathname.startsWith(api));

  // Better Auth session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token") || 
                        request.cookies.get("__secure-next-auth.session-token");

  if (isAdminPage && !isAuthPage) {
    if (!sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  if (isAuthPage && sessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  // Protect non-GET Admin APIs
  if (isApiAdmin && request.method !== "GET") {
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
