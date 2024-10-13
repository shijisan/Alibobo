const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createFirstAdmin() {
  const username = 'admin'; // You can set the desired username here
  const plainPassword = 'yourSecurePassword'; // Use a secure password
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    const adminExists = await prisma.admin.findUnique({
      where: { username },
    });

    if (adminExists) {
      console.log('Admin already exists.');
      return;
    }

    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('First admin created:', newAdmin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createFirstAdmin();
