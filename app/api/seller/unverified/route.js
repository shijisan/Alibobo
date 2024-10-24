// app/api/seller/unverified/route.js
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const unverifiedSellers = await prisma.seller.findMany({
      where: {
        verified: false,
      },
    });
    return new Response(JSON.stringify(unverifiedSellers), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch unverified sellers' }), { status: 500 });
  }
}
