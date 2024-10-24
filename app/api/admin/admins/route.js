import { prisma } from '@/lib/prisma'

export async function GET() {
  const admins = await prisma.admin.findMany();
  return new Response(JSON.stringify(admins), { status: 200 });
}

export async function POST(req) {
  const { email } = await req.json();

  try {
    // Find existing user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Promote the user to admin
    const newAdmin = await prisma.admin.create({
      data: {
        email: user.email,
        userId: user.id, // Assuming 'admin' has a relation with 'user'
      },
    });

    return new Response(JSON.stringify(newAdmin), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error promoting user to admin' }), { status: 500 });
  }
}
