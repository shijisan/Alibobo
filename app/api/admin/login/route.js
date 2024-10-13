import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ error: 'Username and password are required.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Find admin by username
    const admin = await prisma.admin.findUnique({ where: { username } });

    if (!admin) {
      return new Response(JSON.stringify({ error: 'Admin not found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid password.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token
    return new Response(JSON.stringify({ message: 'Login successful', token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error logging in.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client disconnects after the operation
  }
}
