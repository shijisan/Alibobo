// app/api/seller/verify/[id]/route.js
import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Seller ID is required' }), { status: 400 });
  }

  const { verified } = await req.json();

  try {
    const updatedSeller = await prisma.seller.update({
      where: { id: parseInt(id) },
      data: { verified },
    });
    return new Response(JSON.stringify(updatedSeller), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update seller verification status' }), { status: 500 });
  }
}
