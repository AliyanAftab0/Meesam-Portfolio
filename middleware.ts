import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Pages
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("admin_session");

    if (!session || session.value !== "authenticated_amcee_2025") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect from login if already authenticated
  if (pathname === "/admin/login") {
    const session = request.cookies.get("admin_session");
    if (session && session.value === "authenticated_amcee_2025") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  // Protect non-GET Admin APIs
  const protectedApis = ["/api/projects", "/api/settings", "/api/services", "/api/upload"];
  if (protectedApis.some(api => pathname.startsWith(api)) && request.method !== "GET") {
    const session = request.cookies.get("admin_session");
    if (!session || session.value !== "authenticated_amcee_2025") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
