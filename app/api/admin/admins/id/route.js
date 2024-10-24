import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  const { id } = params;
  const admin = await prisma.admin.findUnique({
    where: { id: parseInt(id) },
  });
  return new Response(JSON.stringify(admin), { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { email } = await req.json();

  try {
    // Find the existing user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Update admin entry to reflect the new user info (if needed)
    const updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data: {
        email: user.email,
        userId: user.id,  // Assuming 'admin' has a relation with 'user'
      },
    });

    return new Response(JSON.stringify(updatedAdmin), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error updating admin' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.admin.delete({ where: { id: parseInt(id) } });
  return new Response(null, { status: 204 });
}
