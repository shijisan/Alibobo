import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma'; // Ensure your Prisma client is properly set up here

export async function POST(req) {
  const { username, email, phoneNumber, password } = await req.json();

  if (!username || !email || !phoneNumber || !password) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create new user
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'User registered successfully', user: newUser }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
