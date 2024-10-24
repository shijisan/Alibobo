// pages/api/user/role.js
import { prisma } from '@/lib/prisma'; // Adjust the path as necessary

export default async function handler(req, res) {
  const { email } = req.body; // Get the email from the request body

  if (req.method === 'POST') {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { role: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ role: user.role });
    } catch (error) {
      console.error("Error fetching user role:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
