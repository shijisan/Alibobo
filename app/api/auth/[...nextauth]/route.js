import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // Import from lib/auth.js

// Handle GET and POST requests for NextAuth
export function GET(req, res) {
  return NextAuth(req, res, authOptions);
}

export function POST(req, res) {
  return NextAuth(req, res, authOptions);
}
