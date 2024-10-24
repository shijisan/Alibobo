// lib/auth.js
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check for user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('No user found with this email'); // More specific error
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials'); // Keep this as is
        }

        // Return user data including role
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: '/login', // General login page
  },
  session: {
    strategy: 'jwt', // Using JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Pass user role if you need it
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Attach user role to session if applicable
      return session;
    },
  },
  secret: process.env.JWT_SECRET, // Ensure this is set in your .env file
};
