import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const session = await getSession({ req });

  // Check if user is authenticated and is an admin
  if (!session || session.user.role !== "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { sellerId } = req.body;

  try {
    const seller = await prisma.seller.update({
      where: { id: sellerId },
      data: { verified: true },
    });

    res.status(200).json({ seller });
  } catch (error) {
    res.status(500).json({ message: "Error verifying seller", error: error.message });
  }
}
