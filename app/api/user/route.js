import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET; // Your JWT secret
const prisma = new PrismaClient(); // Initialize Prisma client

export async function GET(req) {
  const token = req.cookies.get('token')?.value; // Get the token from cookies

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(decodeURIComponent(token), JWT_SECRET);
    // Fetch user details from the database using the user ID from the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }, // Assuming the token has the user ID
      select: { id: true, phone: true, isSeller: true } // Select the fields you need
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma client
  }
}
