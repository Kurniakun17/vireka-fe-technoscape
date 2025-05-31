import { NextResponse } from "next/server";

export function middleware(request) {
  // Skip middleware for static files and API routes
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Get the auth token from cookies
  const authToken = request.cookies.get("auth_token");
  const isAuthenticated = !!authToken?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  // If not authenticated and trying to access protected route
  if (!isAuthenticated && !isAuthPage) {
    console.log("Not authenticated, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If authenticated and trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    console.log("Already authenticated, redirecting to dashboard");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Add auth token to request headers if it exists
  if (isAuthenticated) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${authToken.value}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
