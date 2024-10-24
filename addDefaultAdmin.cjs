// addDefaultAdmin.js
const { PrismaClient } = require('@prisma/client'); // Corrected syntax for require
const bcrypt = require('bcryptjs'); // Corrected syntax for require

const prisma = new PrismaClient();

async function main() {
  const email = 'admin1@example.us'; // Replace with your desired admin email
  const password = 'admin123'; // Replace with a secure password
  const role = 'ADMIN'; // Role for the default user

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    // If not, create the default admin user
    const newAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Default Admin', // You can customize this
        role,
      },
    });

    console.log('Default admin created:', newAdmin);
  } else {
    console.log('Admin user already exists. No changes made.');
  }
}

// Run the main function and handle errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
