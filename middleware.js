import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // If no token, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to proceed if the token is present
  return NextResponse.next();
}

// Specify the protected routes
export const config = {
  matcher: ['/seller', '/seller/setup', '/profile'],  // Define your protected routes
};
