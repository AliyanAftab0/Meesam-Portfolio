import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPass = process.env.ADMIN_PASSWORD;

    if (username === expectedUser && password === expectedPass) {
      // For a real production app, use a proper JWT with 'jose' or 'jsonwebtoken'
      // For this portfolio, we'll use a simple session cookie
      const response = NextResponse.json({ success: true });
      
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated_amcee_2025", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
