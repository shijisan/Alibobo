// app/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  // Log the token for debugging
  console.log("Token:", token);

  // Get the current pathname
  const { pathname } = req.nextUrl;
  console.log(`Middleware triggered for: ${pathname}`);

  // Paths that require authentication
  const protectedPaths = ['/seller/dashboard', '/account/:path*', '/register/:path*'];

  // Allow access to /seller/register without any checks
  if (pathname === '/seller/register') {
    return NextResponse.next();
  }

  // If the user is not authenticated and is trying to access a protected path, redirect to login
  if (!token && protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    console.log("Redirecting to login: No token");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check paths that start with /seller or /register
  if (pathname.startsWith('/seller') || pathname.startsWith('/register')) {
    // If the token exists but the role is not 'SELLER', redirect to /seller/register
    if (token && token.role !== 'SELLER') {
      console.log(`Redirecting to /seller/register due to role: ${token.role}`);
      return NextResponse.redirect(new URL('/seller/register', req.url));
    }
  }

  // Allow the request if conditions are met
  return NextResponse.next();
}

// Define which paths this middleware should apply to
export const config = {
  matcher: ['/seller/:path*', '/account/:path*', '/register/:path*'], // Match register paths
};
