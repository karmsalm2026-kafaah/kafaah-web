import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept the root path
  if (pathname === "/") {
    const role = request.cookies.get("kafaah_role")?.value;

    if (!role) {
      // New visitor — redirect to gateway
      return NextResponse.redirect(new URL("/gateway", request.url));
    }
    // Returning visitor with cookie — let them through to homepage
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
